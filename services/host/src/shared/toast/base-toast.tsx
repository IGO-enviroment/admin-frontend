import { Snackbar } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { IToastState } from "@/shared/hooks/use-toast";

export interface BaseToastProps extends Pick<IToastState, "closeToast" | "isVisible"> {
   children: ReactElement;
}

export const BaseToast: FC<BaseToastProps> = ({ isVisible, closeToast, children }) => {
   return (
      <Snackbar open={isVisible} onClose={() => closeToast}>
         {children}
      </Snackbar>
   );
};

export interface ToastProps extends Omit<BaseToastProps, "children"> {
   text: string;
}
