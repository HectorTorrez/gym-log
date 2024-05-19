import type {WebhookEvent} from "@clerk/nextjs/server";

import {Webhook} from "svix";
import {headers} from "next/headers";
import {NextResponse} from "next/server";

import supabase from "@/db/api/server";

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const {data, error} = await supabase.from("users").insert({
      user_id: id,
      email: evt.data.email_addresses[0]?.email_address ?? "no email",
    });

    if (error) {
      console.error("Error inserting user:", error);

      return NextResponse.json({error}, {status: 500});
    }

    return NextResponse.json(data, {status: 200});
  } else if (eventType === "user.deleted") {
    const {data, error} = await supabase.from("users").delete().match({user_id: id});

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
