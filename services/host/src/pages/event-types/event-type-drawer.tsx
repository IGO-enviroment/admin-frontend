import { Button, Container, Drawer, Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SuccessToast } from "@/shared/toast/success-toast";
import { useToast } from "@/shared/hooks/use-toast";
import { eventsTypeApi } from "@/features/redux/event-type-service";

interface EventTypeDrawerProp {
   isVisible: boolean;
   closeDrawer: () => void;
   editEventType?: any;
}

export const EventTypeDrawer: FC<EventTypeDrawerProp> = ({ closeDrawer, isVisible, editEventType }) => {
   const methods = useForm({
      defaultValues: editEventType ?? null,
   });
   const { isVisible: isVisibleToast, openToast, closeToast } = useToast();
   const [updateTypeEvent, { error: updateError }] = eventsTypeApi.useUpdateAreaMutation({});
   const [createTypeEvent, { error: createError }] = eventsTypeApi.useCreateEventTypeMutation({});

   const handleSubmit = async (data: any) => {
      if (editEventType) {
         await updateTypeEvent({ data, id: editEventType.id });
         if (!updateError) {
            closeDrawer();
         }
         return;
      }
      await createTypeEvent(data);
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
                     <TextField {...methods.register("name")} label="title" variant="outlined" />
                     <TextField {...methods.register("description")} label="description" variant="outlined" />
                     {/* <TextField {...methods.register("is_visible")} label="startAt" variant="outlined" /> */}
                  </Stack>
                  <Button type="submit">Сохранить</Button>
               </form>
            </FormProvider>
         </Container>
         <SuccessToast isVisible={isVisibleToast} closeToast={closeToast} text={"Тип мероприятия успешно создано"} />
      </Drawer>
   );
};
