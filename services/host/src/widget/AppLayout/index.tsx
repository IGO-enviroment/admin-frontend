import { Outlet, useLocation } from "react-router";
import * as React from "react";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { retry } from "@reduxjs/toolkit/query";
import { Link } from "react-router-dom";
import { alpha, ListItemButton, Stack } from "@mui/material";
import { forwardRef } from "react";

export const AppLayout = () => (
   <>
      <MiniDrawer />
   </>
);

const drawerWidthOpen = 240;
const drawerWidthClose = 64;

const openedMixin = (theme: Theme): CSSObject => ({
   width: drawerWidthOpen,
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: "hidden",
   width: `${drawerWidthClose}px`,
});

const AppBar = styled("header")(({ theme }) => ({
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   boxShadow: "rgba(0, 0, 0, 0.08) 0px 1.2px 18px, rgba(0, 0, 0, 0.12) 0px 6.4px 28px",
   width: `100%`,
}));

const Aside = styled("aside")<{ open: boolean }>(({ theme, open }) => ({
   position: "fixed",
   height: "100%",
   width: drawerWidthOpen,
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   borderRight: `1px solid rgb(213, 216, 223)`,
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
   }),
}));

const Main = styled("main")<{ open: boolean }>(({ theme, open }) => ({
   marginLeft: `${open ? drawerWidthOpen : drawerWidthClose}px`,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
}));

function MiniDrawer() {
   const [open, setOpen] = React.useState(true);

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
         <CssBaseline />
         <AppBar>
            <Toolbar>
               <Typography variant="h6" noWrap>
                  Admin Museum
               </Typography>
            </Toolbar>
         </AppBar>
         <Box sx={{ width: "100%", position: "relative" }}>
            <Aside open={open}>
               {/*<DrawerHeader>*/}
               {/*   {open ? (*/}
               {/*      <IconButton onClick={handleDrawerClose}>{<ChevronLeftIcon />}</IconButton>*/}
               {/*   ) : (*/}
               {/*      <IconButton onClick={handleDrawerOpen}>{<ChevronRightIcon />}</IconButton>*/}
               {/*   )}*/}
               {/*</DrawerHeader>*/}
               <Navigation />
            </Aside>
            <Main open={open}>
               <Outlet />
            </Main>
         </Box>
      </Box>
   );
}

import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import StadiumRoundedIcon from "@mui/icons-material/StadiumRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

const navConfig = [
   {
      title: "Создать новость",
      path: "/form",
      icon: <NewspaperRoundedIcon />,
   },
   {
      title: "Мероприятия",
      path: "/events",
      icon: <EventRoundedIcon />,
   },
   {
      title: "Типы мероприятий",
      path: "/event-types",
      icon: <CalendarTodayRoundedIcon />,
   },
   {
      title: "Площадки",
      path: "/area",
      icon: <StadiumRoundedIcon />,
   },
   {
      title: "Теги",
      path: "/tags",
      icon: <LocalOfferRoundedIcon />,
   },
];

const RouterLink = forwardRef<any, any>(({ href, ...other }, ref) => <Link ref={ref} to={href} {...other} />);

function NavItem({ item }: { item: { title: string; path: string; icon: any } }) {
   const pathname = useLocation();

   const active = item.path === pathname.pathname;

   return (
      <ListItemButton
         component={RouterLink}
         href={item.path}
         sx={{
            minHeight: 44,
            borderRadius: 0.75,
            typography: "body2",
            color: "text.secondary",
            textTransform: "capitalize",
            fontWeight: "fontWeightMedium",
            ...(active && {
               color: "primary.main",
               fontWeight: "fontWeightSemiBold",
               bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
               "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
               },
            }),
         }}
      >
         <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
         </Box>

         <Box component="span">{item.title} </Box>
      </ListItemButton>
   );
}

function Navigation() {
   return (
      <>
         <Stack>
            {navConfig.map((item) => (
               <NavItem item={item} />
            ))}
         </Stack>
      </>
   );
}
