import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useFieldArray, useForm } from "react-hook-form";
import { TextEditor } from "@/features/editors/text-editor";
import { ControlledForm } from "@/shared/controlled-form";

export const ContentForm = () => {
   const methods = useForm();
   const { fields: metricsFields, append, remove } = useFieldArray({ control: methods.control, name: "metrics" });

   return (
      <ControlledForm methods={methods}>
         <Stack sx={{ gap: "30px" }}>
            {metricsFields.map((field, index) => (
               <TextEditor />
            ))}
            <Button onClick={() => append({})}>Добавить форму</Button>
         </Stack>
      </ControlledForm>
   );
};
