import { RouteObject, useRoutes } from "react-router-dom";
import { ContentForm } from "@/widget/content-form";
import { TextEditor } from "@/features/editors/text-editor";
import { AppLayout } from "@/widget/AppLayout";
import { useDrawerState } from "@/shared/hooks/use-drawer-state";
import { Drawer, Stack, Table, TableCell, TableHead, TableRow, TableContainer, TableBody } from "@mui/material";
import Button from "@mui/material/Button";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { eventsApi } from "@/features/redux/event-service";
import { EventsList } from "@/pages/events";

export const Routing = () => {
   return (
      <>
         <Routes />
      </>
   );
};

function Routes() {
   return useRoutes(microfrontendRoutes);
}


const commonPart: RouteObject[] = [
   {
      path: "/",
      element: <h1>Рутовая страница</h1>,
   },
   {
      path: "text",
      element: <TextEditor />,
   },
   {
      path: "form",
      element: <ContentForm />,
   },
   {
      path: "events",
      element: <EventsList />,
   },
];

export const microfrontendRoutes: RouteObject[] = [
   {
      element: <AppLayout />,
      children: commonPart,
   },
];
