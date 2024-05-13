import CreateTemplates from "@/components/create-templates";

export default function Workoutpage() {
  return (
    <section>
      <h2 className="mt-3 text-xl font-bold">Templates</h2>
      <section>
        <CreateTemplates isEditing={false} />
      </section>
    </section>
  );
}
