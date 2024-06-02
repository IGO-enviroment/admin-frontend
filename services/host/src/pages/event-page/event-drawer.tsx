import { MultiPhotoInput } from "@/features/editors/multi-photo-input";
import { PhotoInput } from "@/features/editors/photoInput";
import { Button, Drawer, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface EventDrawerProp {
    isVisible: boolean
    handleSubmit: (data: any) => void | Promise<void>
    closeDrawer: () => void
}

export const EventDrawer: FC<EventDrawerProp> = ({ closeDrawer, handleSubmit, isVisible }) => {
    const methods = useForm({});
    return <Drawer open={isVisible} onClose={() => closeDrawer()} >
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <Stack sx={{ gap: "20px" }}>
                    <TextField {...methods.register("title")} label="title" variant="outlined" />
                    <TextField {...methods.register("description")} label="description" variant="outlined" />
                    <TextField {...methods.register("startAt")} label="startAt" variant="outlined" />
                    <TextField {...methods.register("duration")} label="duration" variant="outlined" />
                    <TextField {...methods.register("ticketCount")} label="ticketCount" variant="outlined" />
                    <TextField {...methods.register("area")} label="area" variant="outlined" />
                    <TextField {...methods.register("type")} label="type" variant="outlined" />
                    <TextField {...methods.register("tags")} label="tags" variant="outlined" />
                    <TextField {...methods.register("costs")} label="costs" variant="outlined" />
                    <PhotoInput name="previewFile" />
                    <MultiPhotoInput name="additionalFiles" />
                </Stack>
                <Button type="submit">Сохранить</Button>
            </form>
        </FormProvider>
    </Drawer>
}