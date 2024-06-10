import { Button, Container, Drawer, Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SuccessToast } from "@/shared/toast/success-toast";
import { useToast } from "@/shared/hooks/use-toast";
import { eventsTypeApi } from "@/features/redux/event-type-service";
import { useSnackbar } from "notistack";
import { BooleanField } from "@/shared/controlled-form/boolean-field";

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
   const { enqueueSnackbar } = useSnackbar();
   const [updateTypeEvent, { error: updateError }] = eventsTypeApi.useUpdateAreaMutation({});
   const [createTypeEvent, { error: createError }] = eventsTypeApi.useCreateEventTypeMutation({});

   const handleSubmit = async (data: any) => {
      if (editEventType) {
         await updateTypeEvent({ data, id: editEventType.Id });
         if (!updateError) {
            enqueueSnackbar("Тип мероприятия успешно изменён", { variant: "success" });

            closeDrawer();
         }
         return;
      }
      await createTypeEvent(data);
      if (!createError) {
         enqueueSnackbar("Тип мероприятия успешно создано", { variant: "success" });
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
                     <TextField {...methods.register("Name")} label="title" variant="outlined" />
                     <TextField {...methods.register("Description")} label="description" variant="outlined" />
                     <BooleanField name={"IsVisible"} label="isVisible" />
                  </Stack>
                  <Button type="submit">Сохранить</Button>
               </form>
            </FormProvider>
         </Container>
         <SuccessToast isVisible={isVisibleToast} closeToast={closeToast} text={"Тип мероприятия успешно создано"} />
      </Drawer>
   );
};
