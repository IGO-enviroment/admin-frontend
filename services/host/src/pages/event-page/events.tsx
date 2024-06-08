import { eventsApi } from "@/features/redux/event-service";
import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import { EventDrawer } from "./event-drawer";
import { useToast } from "@/shared/hooks/use-toast";
import React, { useState } from "react";
import { SuccessToast } from "@/shared/toast/success-toast";
import { LongMenu } from "@/shared/table-menu/table-menu";

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
   const { isVisible, closeDrawer, openDrawer, isMounted } = useDrawerState();
   const { isVisible: isVisibleToast, openToast, closeToast } = useToast();

   const { data } = eventsApi.useGetAllEventsQuery("");
   const [createEvent, { error }] = eventsApi.useCreateEventMutation({});

   const rows = data?.events;
   const handleSubmit = async (data: any) => {
      await createEvent(data);
      if (!error) {
         openToast();
         closeDrawer();
      }
   };

   return (
      <>
         <Container maxWidth={"xl"}>
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
                        <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, position: "relative" }}>
                           <TableCell component="th" scope="row" align="center">
                              {row.title}
                           </TableCell>
                           <TableCell align="center">{`${row.publich}`}</TableCell>
                           <TableCell align="center">{row.ticketCount}</TableCell>
                           <TableCell align="center">{row.type}</TableCell>
                           <TableCell align="center">{row.area}</TableCell>
                           <TableCell align="center">{row.created_at}</TableCell>
                           <LongMenu onDeleteClick={() => {}} onEditClick={() => {}} />
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Container>
         {isMounted && <EventDrawer closeDrawer={closeDrawer} handleSubmit={handleSubmit} isVisible={isVisible} />}
         <SuccessToast isVisible={isVisibleToast} closeToast={closeToast} text={"Мероприятие успешно создано"} />
      </>
   );
};
