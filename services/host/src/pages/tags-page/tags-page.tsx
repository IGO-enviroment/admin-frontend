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
import { EventTypeDrawer } from "@/pages/event-types/event-type-drawer";
import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { TagDrawer } from "@/pages/tags-page/tag-drawer";
import React, { useState } from "react";
import { LongMenu } from "@/shared/table-menu/table-menu";
import { useSnackbar } from "notistack";
import { eventsTypeApi } from "@/features/redux/event-type-service";
import { tagApi } from "@/features/redux/tag-service";

export const TagsPage = () => {
   const { enqueueSnackbar } = useSnackbar();
   const [editTag, setEditTag] = useState(null);

   const { isVisible, closeDrawer, openDrawer } = useDrawerState();
   const { data, isLoading } = tagApi.useGetAllTagsQuery("");
   console.log(data);
   const [deleteTag] = tagApi.useDeleteTagMutation({});

   const handleUpdate = async (areaData: any) => {
      console.log(areaData);
      setEditTag(areaData);
      openDrawer();
   };

   const handleCreate = () => {
      setEditTag(null);
      openDrawer();
   };

   const handleDelete = async (id: string) => {
      const res = await deleteTag(id);
      if ("error" in res && "originalStatus" in res.error && res.error.originalStatus > 299) {
         enqueueSnackbar("Ошибка при удалении типа мероприятия", { variant: "error" });
         return;
      }
      enqueueSnackbar("Тип мероприятия успешно удалён", { variant: "success" });
   };

   if (isLoading) return <CircularProgress />;

   if ((!data || !data?.length) && !isLoading)
      return (
         <Stack>
            <Typography>Пока тегов</Typography>
            <Button onClick={handleCreate}>Создать тегов</Button>
            <TagDrawer closeDrawer={closeDrawer} isVisible={isVisible} />
         </Stack>
      );
   return (
      <>
         <Container maxWidth={"xl"}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "30px", alignItems: "center" }}>
               <h1>Тег</h1>
               <Button onClick={openDrawer}>Создать тег</Button>
            </Box>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                     <TableRow>
                        <TableCell align="center">name</TableCell>
                        <TableCell align="center">description</TableCell>
                        <TableCell align="center">groupName</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {data?.map((row: any) => (
                        <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, position: "relative" }}>
                           <TableCell component="th" scope="row" align="center">
                              {row.title}
                           </TableCell>
                           <TableCell align="center">{`${row.name}`}</TableCell>
                           <TableCell align="center">{row.description}</TableCell>
                           <TableCell align="center">{row.groupName}</TableCell>
                           <LongMenu onDeleteClick={() => handleDelete(row.Id)} onEditClick={() => handleUpdate(row)} />
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Container>
         <TagDrawer closeDrawer={closeDrawer} isVisible={isVisible} editTag={editTag} />
      </>
   );
};
