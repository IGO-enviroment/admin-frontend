import { MultiPhotoInput } from "@/features/editors/multi-photo-input";
import { PhotoInput } from "@/features/editors/photoInput";
import { Button, Drawer, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface EventTypeDrawerProp {
    isVisible: boolean
    handleSubmit: (data: any) => void | Promise<void>
    closeDrawer: () => void
}

export const EventTypeDrawer: FC<EventTypeDrawerProp> = ({ closeDrawer, handleSubmit, isVisible }) => {
    const methods = useForm({});
    return <Drawer open={isVisible} onClose={() => closeDrawer()} >
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <Stack sx={{ gap: "20px" }}>
                    <TextField {...methods.register("name")} label="title" variant="outlined" />
                    <TextField {...methods.register("description")} label="description" variant="outlined" />
                    {/* <TextField {...methods.register("is_visible")} label="startAt" variant="outlined" /> */}
                </Stack>
                <Button type="submit">Сохранить</Button>
            </form>
        </FormProvider>
    </Drawer>
}