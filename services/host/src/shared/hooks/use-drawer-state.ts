import { useEffect, useState } from "react";

const defaultDrawerTransitionTime = 200;

export interface IDrawerState {
   /**
    * Дровер смонтирован (но не обязательно открыт)
    */
   isMounted: boolean;
   /**
    * Дровер открыт
    */
   isVisible: boolean;
   openDrawer: () => void;
   closeDrawer: (callback?: () => void) => void;
}
export const useDrawerState = (): IDrawerState => {
   const [isMounted, setIsMounted] = useState(false);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const listener = (e: { code: string }) => {
         if (e.code === "Escape") {
            closeDrawer();
         }
      };

      addEventListener("keyup", listener);

      return () => {
         window.removeEventListener("keyup", listener);
      };
   });

   const closeDrawer = (callback?: () => void) => {
      setIsVisible(false);
      setTimeout(() => {
         setIsMounted(false);
         callback?.();
      }, defaultDrawerTransitionTime);
   };

   const openDrawer = () => {
      setIsMounted(true);
      console.log('dasdas')
      setTimeout(() => setIsVisible(true));
   };

   // todo isMounted, isVisible - переименовать
   return {
      isMounted,
      isVisible,
      openDrawer,
      closeDrawer,
   };
};
