import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useFieldArray, useForm } from "react-hook-form";
import { TextEditor } from "@/features/editors/text-editor";
import { ControlledForm } from "@/shared/controlled-form";
import Box from "@mui/material/Box";

export const ContentForm = () => {
   const methods = useForm();
   const { fields: metricsFields, append, remove } = useFieldArray({ control: methods.control, name: "metrics" });

   return (
      <Box sx={{ mx: "60px" }}>
         <ControlledForm methods={methods}>
            <Stack sx={{ gap: "30px", alignContent: "flex-start", alignItems: "flex-start" }}>
               {metricsFields.map((field, index) => (
                  <TextEditor />
               ))}
               <Button onClick={() => append({})}>Добавить форму</Button>
            </Stack>
         </ControlledForm>
      </Box>
   );
};
