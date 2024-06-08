import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { AreaDrawer } from "@/pages/area-apge/area-drawer";
import { areaApi } from "@/features/redux/area-service";
import { LongMenu } from "@/shared/table-menu/table-menu";

export const AreaPage = () => {
   const { isVisible, closeDrawer, openDrawer, isMounted } = useDrawerState();

   const [editArea, setEditArea] = useState(null);

   const { data } = areaApi.useGetAllAreasQuery("");
   const [deleteArea, { error: deleteError }] = areaApi.useDeleteAreaMutation({});

   const handleDelete = async (id: string) => {
      await deleteArea(id);
      // if (!deleteError) {
      //    // openToast();
      //    closeDrawer();
      // }
   };

   const handleUpdate = async (areaData: any) => {
      setEditArea(areaData);
      openDrawer();
   };

   const handleCreate = () => {
      setEditArea(null);
      openDrawer();
   };

   return (
      <>
         <Container maxWidth={"xl"}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "30px", alignItems: "center" }}>
               <h1>Площадка</h1>
               <Button onClick={handleCreate}>Создать площадку</Button>
            </Box>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                     <TableRow>
                        <TableCell align="center">name</TableCell>
                        <TableCell align="center">description</TableCell>
                        <TableCell align="center">addressValue</TableCell>
                        <TableCell align="center">publish</TableCell>
                        <TableCell align="center">longitude</TableCell>
                        <TableCell align="center">latitude</TableCell>
                        <TableCell align="center">createdAt</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {data?.map((row: any) => (
                        <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, position: "relative" }}>
                           <TableCell component="th" scope="row" align="center">
                              {row.name}
                           </TableCell>
                           <TableCell align="center">{row.description}</TableCell>
                           <TableCell align="center">{row.addressValue}</TableCell>
                           <TableCell align="center">{`${row.publich}`}</TableCell>
                           <TableCell align="center">{row.longitude}</TableCell>
                           <TableCell align="center">{row.latitude}</TableCell>
                           <TableCell align="center">{row.createdAt}</TableCell>
                           <LongMenu onDeleteClick={() => handleDelete(row.id)} onEditClick={() => handleUpdate(row)} />
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Container>
         {isMounted && <AreaDrawer closeDrawer={closeDrawer} isVisible={isVisible} editArea={editArea} />}
      </>
   );
};
