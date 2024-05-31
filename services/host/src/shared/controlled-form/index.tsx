import React, { PropsWithChildren } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface IFormProps<T> {
   methods: UseFormReturn<T>;
}

export function ControlledForm<T = never>({ methods, children }: PropsWithChildren<IFormProps<T>>) {
   return (
      <FormProvider {...methods}>
         <form>{children}</form>
      </FormProvider>
   );
}
