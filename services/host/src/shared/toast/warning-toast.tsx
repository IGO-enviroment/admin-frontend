import React, { FC } from "react";
import { BaseToast, ToastProps } from "@/shared/toast/base-toast";
import { Alert } from "@mui/material";

export const WarningToast: FC<ToastProps> = ({ closeToast, isVisible, text }) => {
   return (
      <BaseToast isVisible={isVisible} closeToast={closeToast}>
         <Alert onClose={() => closeToast()} severity="warning" variant="filled" sx={{ width: "100%" }}>
            {text}
         </Alert>
      </BaseToast>
   );
};
