import { FunctionComponent, ReactNode, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import { TToolbarComponentProps, TToolbarButtonSize } from "./Toolbar";

interface IToolbarButtonProps {
   label: string;
   style: string;
   onClickType: string;
   editorId?: string;
   id?: string;
   active?: boolean;
   icon?: ReactNode;
   onClick?: any;
   inlineMode?: boolean;
   disabled?: boolean;
   size?: TToolbarButtonSize;
   Component?: FunctionComponent<TToolbarComponentProps>;
}

export const ToolbarButton: FunctionComponent<IToolbarButtonProps> = ({
   label,
   style,
   onClickType,
   inlineMode,
   Component,
   onClick,
   active,
   disabled,
   icon,
   ...props
}) => {
   const size = !inlineMode ? props.size || "medium" : "small";
   const toolbarId = inlineMode ? "-toolbar" : "";
   const editorId = props.editorId || "mui-rte";
   const elemId = editorId + "-" + (props.id || label) + "-button" + toolbarId;
   const sharedProps = {
      id: elemId,
      onMouseDown: (e: MouseEvent) => {
         e.preventDefault();
         if (onClick) {
            onClick(style, onClickType, elemId, inlineMode);
         }
      },
      disabled: disabled || false,
   };
   if (icon) {
      return (
         <IconButton {...sharedProps} aria-label={label} color={active ? "primary" : "default"} size={size}>
            {icon}
         </IconButton>
      );
   }
   if (Component) {
      return <Component {...sharedProps} active={active || false} />;
   }
   return null;
};
