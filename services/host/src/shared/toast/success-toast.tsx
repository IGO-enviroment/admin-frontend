import { BaseToast, ToastProps } from "@/shared/toast/base-toast";
import React, { FC } from "react";
import { Alert } from "@mui/material";

export const SuccessToast: FC<ToastProps> = ({ closeToast, isVisible, text }) => {
   return (
      <BaseToast isVisible={isVisible} closeToast={closeToast}>
         <Alert onClose={() => closeToast()} severity="success" variant="filled" sx={{ width: "100%" }}>
            {text}
         </Alert>
      </BaseToast>
   );
};
