import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import { EventTypeDrawer } from "@/pages/event-types/event-type-drawer";
import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { TagDrawer } from "@/pages/tags-page/tag-drawer";

export const TagsPage = () => {
   const { isVisible, closeDrawer, openDrawer } = useDrawerState();
   const rows: any[] = [];
   return (
      <>
         <Container maxWidth={"xl"}>
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
         {/*<TagDrawer closeDrawer={closeDrawer} handleSubmit={handleSubmit} isVisible={isVisible} />*/}
      </>
   );
};
