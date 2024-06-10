import { FC, SyntheticEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

interface BooleanFieldProps {
   name: string;
   label: string;
   onChange?: (e: SyntheticEvent<Element, Event>) => void;
}

export const BooleanField: FC<BooleanFieldProps> = ({ name, onChange, label }) => {
   const { control, watch } = useFormContext();
   const value = watch(name);

   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange: onChangeField, ...restField } }) => (
            <FormControlLabel
               control={
                  <Checkbox
                     {...restField}
                     onChange={(e) => {
                        onChangeField(e);
                        onChange?.(e);
                     }}
                     value={value}
                  />
               }
               label={label}
            />
         )}
      />
   );
};
