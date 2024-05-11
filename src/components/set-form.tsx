import type {Control, FieldArrayWithId} from "react-hook-form";
import type {Exercises, FieldsSet} from "@/types/exercise";

import {useFieldArray} from "react-hook-form";

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {DeleteExerciseMenu} from "./delete-exercise-menu";
import {DeleteSet} from "./delete-set";

interface SetProps {
  control: Control;
  exercise: Exercises;
  index: number;
  removeExercise: (index: number) => void;
  handleDeleteExercise: (id: string) => void;
}

export function Set({control, exercise, index, removeExercise, handleDeleteExercise}: SetProps) {
  const {
    fields: untypedFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  const fields = untypedFields as unknown as FieldArrayWithId<FieldsSet>[];

  return (
    <section className="flex flex-col justify-center gap-3">
      <section className=" flex w-full items-center justify-between">
        <FormField
          control={control}
          defaultValue={exercise.name}
          name={`exercises.${index}.name`}
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">{field.value}</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <DeleteExerciseMenu
          onRemove={() => {
            if (exercise.id) {
              removeExercise(index);

              handleDeleteExercise(exercise.id);
            }
          }}
        />
      </section>

      {fields.map((setField, setIndex) => (
        <section key={setField.id} className="ustify-center grid grid-cols-4 gap-5">
          <FormField
            control={control}
            defaultValue={setIndex + 1}
            name={`exercises.${index}.sets.${setIndex}.set`}
            render={({field}) => (
              <FormItem>
                <FormLabel>Set</FormLabel>
                <FormControl>
                  <Input
                    className="flex items-center justify-center text-center"
                    type="number"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            defaultValue={setField.weight}
            name={`exercises.${index}.sets.${setIndex}.weight`}
            render={({field}) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    className="flex items-center justify-center text-center"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            defaultValue={setField.reps}
            name={`exercises.${index}.sets.${setIndex}.reps`}
            render={({field}) => (
              <FormItem>
                <FormLabel>Reps</FormLabel>
                <FormControl>
                  <Input
                    className="flex items-center justify-center text-center"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="flex items-center justify-center">
            <DeleteSet
              onRemove={() => {
                remove(setIndex);
              }}
            />
          </section>
        </section>
      ))}

      <Button
        className="h-7"
        type="button"
        variant="secondary"
        onClick={() => append({id: crypto.randomUUID(), weight: 0, reps: 0})}
      >
        Add set
      </Button>
    </section>
  );
}
