import { eventsApi } from "@/features/redux/event-service";
import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { Box, Button, Drawer, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { MultiPhotoInput } from "@/features/editors/multi-photo-input";

interface EventDTO {
    title: string;
    description?: string;
    startAt?: string;
    duration?: string;
    ticketCount?: number;
    area?: number;
    type?: number;
    tags?: number[];
    costs?: any[];
}

export const EventsList = () => {
    const { isVisible, closeDrawer, openDrawer } = useDrawerState();
    const methods = useForm<EventDTO>({});

    const { data } = eventsApi.useGetAllEventsQuery("");
    const [createEvent] = eventsApi.useCreateEventMutation();
    // console.log(g);

    const rows = data?.events;
    const handleSubmit = (data: any) => {
        createEvent(data);
        console.log(data);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "30px", alignItems: "center" }}>
                <h1>Cобытия</h1>
                <Button onClick={openDrawer}>Создать событие</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">title</TableCell>
                            <TableCell align="center">publich</TableCell>
                            <TableCell align="center">ticketCount</TableCell>
                            <TableCell align="center">type</TableCell>
                            <TableCell align="center">area</TableCell>
                            <TableCell align="center">created_at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row: any) => (
                            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.title}
                                </TableCell>
                                <TableCell align="center">{`${row.publich}`}</TableCell>
                                <TableCell align="center">{row.ticketCount}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.area}</TableCell>
                                <TableCell align="center">{row.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Drawer open={isVisible} onClose={() => closeDrawer()}>
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
                            <MultiPhotoInput />
                        </Stack>
                        <Button type="submit">Сохранить</Button>
                    </form>
                </FormProvider>
            </Drawer>
        </>
    );
};