import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import {
   Box,
   Button,
   CircularProgress,
   Container,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { eventsTypeApi } from "@/features/redux/event-type-service";
import { EventTypeDrawer } from "./event-type-drawer";
import React, { useState } from "react";
import { LongMenu } from "@/shared/table-menu/table-menu";
import { useSnackbar } from "notistack";

export const EventsTypeList = () => {
   const { isVisible, closeDrawer, openDrawer, isMounted } = useDrawerState();

   const [editEventType, setEditEventType] = useState(null);

   const { data, isLoading } = eventsTypeApi.useGetAllEventTypesQuery("");
   const [deleteTypeEvent] = eventsTypeApi.useDeleteAreaMutation({});
   const { enqueueSnackbar } = useSnackbar();

   const handleDelete = async (id: string) => {
      const res = await deleteTypeEvent(id);
      if ("error" in res && "originalStatus" in res.error && res.error.originalStatus > 299) {
         enqueueSnackbar("Ошибка при удалении типа мероприятия", { variant: "error" });
         return;
      }
      enqueueSnackbar("Тип мероприятия успешно удалён", { variant: "success" });
   };

   const handleUpdate = async (areaData: any) => {
      console.log(areaData);
      setEditEventType(areaData);
      openDrawer();
   };

   const handleCreate = () => {
      setEditEventType(null);
      openDrawer();
   };

   if (isLoading) return <CircularProgress />;

   if (!data && !isLoading)
      return (
         <Stack>
            <Typography>Пока нет типов</Typography>
            <Button onClick={handleCreate}>Создать тип Мероприятия</Button>
            {isMounted && <EventTypeDrawer closeDrawer={closeDrawer} isVisible={isVisible} />}
         </Stack>
      );

   return (
      <>
         <Container maxWidth={"xl"}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "30px", alignItems: "center" }}>
               <h1>Cобытия</h1>
               <Button onClick={handleCreate}>Создать тип Мероприятия</Button>
            </Box>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">IsVisible</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {data?.map((row: any, index: number) => (
                        <TableRow
                           key={`${row.Id}_${index}`}
                           sx={{ "&:last-child td, &:last-child th": { border: 0 }, position: "relative" }}
                        >
                           <TableCell component="th" scope="row" align="center">
                              {row.Name}
                           </TableCell>
                           <TableCell align="center">{row.Description}</TableCell>
                           <TableCell align="center">{`${row.IsVisible}`}</TableCell>
                           <LongMenu onDeleteClick={() => handleDelete(row.Id)} onEditClick={() => handleUpdate(row)} />
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Container>
         {isMounted && <EventTypeDrawer closeDrawer={closeDrawer} editEventType={editEventType} isVisible={isVisible} />}
      </>
   );
};
