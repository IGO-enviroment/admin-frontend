import { RouteObject, useRoutes } from "react-router-dom";
import { ContentForm } from "@/widget/content-form";
import { TextEditor } from "@/features/editors/text-editor";
import { AppLayout } from "@/widget/AppLayout";
import React from "react";
import { EventsList } from "@/pages/event-page/events";
import { EventsTypeList } from "@/pages/event-types/event-types-page";
import { AuthGuard, AuthStoreProvider, UserStoreProvider } from "@/pages/login-page";
import { AreaPage } from "@/pages/area-apge/area-page";

export const Routing = () => {
   return (
      <>
         <UserStoreProvider>
            <AuthStoreProvider>
               <AuthGuard>
                  <Routes />
               </AuthGuard>
            </AuthStoreProvider>
         </UserStoreProvider>
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
   {
      path: "event-types",
      element: <EventsTypeList />,
   },

   {
      path: "area",
      element: <AreaPage />,
   },
];

export const microfrontendRoutes: RouteObject[] = [
   {
      element: <AppLayout />,
      children: commonPart,
   },
];
