import { eventsApi } from "@/features/redux/event-service";
import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { Box, Button, Container, Drawer, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { eventsTypeApi } from "@/features/redux/event-type-service";
import { EventTypeDrawer } from "./event-type-drawer";

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

export const EventsTypeList = () => {
    const { isVisible, closeDrawer, openDrawer } = useDrawerState();


    const { data } = eventsTypeApi.useGetAllEventTypesQuery("");
    const [createTypeEvent, { error }] = eventsTypeApi.useCreateEventTypeMutation({});
    // console.log(g);
    console.log(data)
    // const rows = data?.events;
    const rows: any[] = [];
    const handleSubmit = async (data: any) => {
        await createTypeEvent(data);
        if (!error) {
            closeDrawer()
        }
    };


    if (!data) return <Stack>
        <Typography>Пока нет типов</Typography>
        <Button onClick={openDrawer}>Создать тип Мероприятия</Button>
        <EventTypeDrawer closeDrawer={closeDrawer} handleSubmit={handleSubmit} isVisible={isVisible} />
    </Stack>

    return (
        <>
            <Container maxWidth={"xl"} >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "30px", alignItems: "center" }}>
                    <h1>Cобытия</h1>
                    <Button onClick={openDrawer}>Создать тип Мероприятия</Button>
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
            </Container>
            <EventTypeDrawer closeDrawer={closeDrawer} handleSubmit={handleSubmit} isVisible={isVisible} />
        </>
    );
};