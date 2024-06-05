import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export const Appbar = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" elevation={2} sx={{ mb: "40px" }}>
            <Toolbar sx={{ display: "flex", gap: "40px" }}>
               <Typography variant="h6">Admin</Typography>
               <Box component={Link} to={"/form"} sx={{ typography: "body1", textDecoration: "none", color: "inherit" }}>
                  Создать новость
               </Box>

               <Box component={Link} to={"/events"} sx={{ typography: "body1", textDecoration: "none", color: "inherit" }}>
                  Мероприятия
               </Box>

               <Box component={Link} to={"/event-types"} sx={{ typography: "body1", textDecoration: "none", color: "inherit" }}>
                  Типы мероприятий
               </Box>
            </Toolbar>
         </AppBar>
      </Box>
   );
};
