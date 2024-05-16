import type {TypeReusableTemplate} from "@/types/type-reusable-template";

import {currentUser} from "@clerk/nextjs";

import CreateTemplates from "@/components/create-templates";
import {getReusableTemplates} from "@/queries/get-reusables-templates";

import {ReusableTemplates} from "./components/reusable-templates";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export default async function Workoutpage() {
  const user = await currentUser();

  if (!user) return null;
  const data = await getReusableTemplates(user.id);

  return (
    <section className="mt-10 flex flex-col gap-10">
      <h2 className=" text-xl font-bold">Templates</h2>
      <section>
        <CreateTemplates isEditing={false} />
      </section>
      <section className="flex flex-col gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
        {data?.map((template: TypeReusableTemplate) => {
          return <ReusableTemplates key={template.id} {...template} />;
        })}
      </section>
    </section>
  );
}
