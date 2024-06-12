import { FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Button, Container, Drawer, Stack, TextField } from "@mui/material";
import { BooleanField } from "@/shared/controlled-form/boolean-field";
import React, { FC } from "react";
import { tagApi } from "@/features/redux/tag-service";

interface TagDrawerProp {
   isVisible: boolean;
   closeDrawer: () => void;
   editTag?: any;
}
export const TagDrawer: FC<TagDrawerProp> = ({ closeDrawer, isVisible, editTag }) => {
   const methods = useForm({
      defaultValues: editTag ?? null,
   });
   const { enqueueSnackbar } = useSnackbar();
   const [updateTag] = tagApi.useUpdateTagMutation({});
   const [createTag] = tagApi.useCreateTagMutation({});

   const handleSubmit = async (data: any) => {
      if (editTag) {
         const res = await updateTag({ data, id: editTag.Id });
         if ("error" in res && "originalStatus" in res.error && res.error.originalStatus > 299) {
            enqueueSnackbar("Ошибка при редактировании тега", { variant: "error" });
            return;
         }
         enqueueSnackbar("Тип тег успешно изменён", { variant: "success" });

         closeDrawer();
         return;
      }
      const res = await createTag(data);
      if ("error" in res && "originalStatus" in res.error && res.error.originalStatus > 299) {
         enqueueSnackbar("Ошибка при создании тега", { variant: "error" });
         return;
      }
      enqueueSnackbar("Тип мероприятия успешно создано", { variant: "success" });
      closeDrawer();
   };

   return (
      <Drawer open={isVisible} onClose={() => closeDrawer()}>
         <Container sx={{ my: "40px" }}>
            <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <Stack sx={{ gap: "20px", mb: "20px" }}>
                     <TextField {...methods.register("name")} label="name" variant="outlined" />
                     <TextField {...methods.register("description")} label="description" variant="outlined" />
                     <TextField {...methods.register("groupName")} label="groupName" variant="outlined" />
                  </Stack>
                  <Button type="submit">Сохранить</Button>
               </form>
            </FormProvider>
         </Container>
      </Drawer>
   );
};
