import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Container, Drawer, Stack, TextField } from "@mui/material";
import { areaApi } from "@/features/redux/area-service";
import { SuccessToast } from "@/shared/toast/success-toast";
import { useToast } from "@/shared/hooks/use-toast";

interface AreaDrawerProp {
   isVisible: boolean;
   closeDrawer: () => void;
   editArea?: any;
}

export const AreaDrawer: FC<AreaDrawerProp> = ({ closeDrawer, isVisible, editArea }) => {
   const methods = useForm({
      defaultValues: editArea ?? null,
   });
   const { isVisible: isVisibleToast, openToast, closeToast } = useToast();

   const [createArea, { error: createError }] = areaApi.useCreateAreaMutation({});
   const [updateArea, { error: updateError }] = areaApi.useUpdateAreaMutation({});

   const handleSubmit = async (data: any) => {
      if (editArea) {
         await updateArea({ data, id: editArea.id });
         if (!updateError) {
            closeDrawer();
         }
         return;
      }
      await createArea(data);
      if (!createError) {
         openToast();
         closeDrawer();
      }
   };
   return (
      <Drawer open={isVisible} onClose={() => closeDrawer()}>
         <Container sx={{ my: "40px" }}>
            <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <Stack sx={{ gap: "20px", mb: "20px" }}>
                     <TextField {...methods.register("name")} label="name" variant="outlined" />
                     <TextField {...methods.register("description")} label="description" variant="outlined" />
                     <TextField {...methods.register("publish")} label="publish" variant="outlined" />
                     <TextField {...methods.register("addressValue")} label="addressValue" variant="outlined" />
                     <TextField {...methods.register("longitude")} label="longitude" variant="outlined" />
                     <TextField {...methods.register("latitude")} label="latitude" variant="outlined" />
                  </Stack>
                  <Button type="submit">Сохранить</Button>
               </form>
            </FormProvider>
         </Container>
         <SuccessToast isVisible={isVisibleToast} closeToast={closeToast} text={"Площадка успешно создана"} />
      </Drawer>
   );
};
