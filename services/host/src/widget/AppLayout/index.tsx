import { Appbar } from "@/widget/appbar";
import { Outlet } from "react-router";

export const AppLayout = () => (
   <>
      <Appbar />
      <Outlet />
   </>
);
