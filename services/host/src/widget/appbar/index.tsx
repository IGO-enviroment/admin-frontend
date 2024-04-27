import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export const Appbar = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" sx={{ bgcolor: "coral" }}>
            <Toolbar sx={{ display: "flex", gap: "40px" }}>
               <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <HomeRoundedIcon />
               </IconButton>
               <Typography variant="h6">Админка</Typography>
               <Link href="/form" underline="hover">
                  Создать пост
               </Link>
            </Toolbar>
         </AppBar>
      </Box>
   );
};
