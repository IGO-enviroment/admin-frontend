import { useEffect, useState } from "react";

export interface IToastState {
   isVisible: boolean;
   openToast: () => void;
   closeToast: (callback?: () => void) => void;
}

const autoHideDuration = 6000;

export const useToast = (): IToastState => {
   const [isVisible, setIsVisible] = useState(false);

   const closeToast = (callback?: () => void) => {
      setIsVisible(false);
      setTimeout(() => {
         callback?.();
      }, autoHideDuration);
   };

   const openToast = () => {
      setTimeout(() => setIsVisible(true));
   };

   return {
      isVisible,
      openToast,
      closeToast,
   };
};
