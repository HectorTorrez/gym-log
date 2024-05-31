import type {WebhookEvent} from "@clerk/nextjs/server";

import {Webhook} from "svix";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";

import supabase from "@/db/api/server";

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
);

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);

    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const {id} = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    if (!id) return new Response("No user ID", {status: 400});

    const {data, error} = await supabaseService.from("users").insert({
      user_id: id,
      email: evt.data.email_addresses[0]?.email_address ?? "no email",
      username: evt.data.username,
      name: evt.data.first_name + " " + evt.data.last_name,
      role: 'client'
    });

    if (error) {
      console.error("Error inserting user:", error);

      return NextResponse.json({error}, {status: 500});
    }

    return NextResponse.json(data, {status: 200});
  } 

  if (eventType === "user.updated") {
    if (evt.data.username === null) {
      return new Response("No username", {status: 400});
    }
    await supabase
      .from("users")
      .update({
        email: evt.data.email_addresses[0]?.email_address ?? null,
        username: evt.data.username,
        name: evt.data.first_name + " " + evt.data.last_name,
      })
      .match({user_id: id});
  }

  if (eventType === "user.deleted") {
    const {data, error} = await supabaseService.from("users").delete().match({user_id: id});

    if (error) {
      console.error("Error deleting user:", error);

      return NextResponse.json({error}, {status: 500});
    }

    return NextResponse.json(data, {status: 200});
  }
  console.log({id, eventType});
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  return new Response("", {status: 200});
}
