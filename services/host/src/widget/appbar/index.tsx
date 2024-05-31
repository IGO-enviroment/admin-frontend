import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export const Appbar = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" elevation={2} sx={{ mb: "40px" }}>
            <Toolbar sx={{ display: "flex", gap: "40px" }}>
               <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <HomeRoundedIcon />
               </IconButton>
               <Typography variant="h6">Admin</Typography>
               <Link href="/form" underline="none" color="inherit" sx={{ typography: "body1" }}>
                  Создать новость
               </Link>
               <Link href="/events" underline="none" color="inherit" sx={{ typography: "body1" }}>
                  Мероприятия
               </Link>
            </Toolbar>
         </AppBar>
      </Box>
   );
};
