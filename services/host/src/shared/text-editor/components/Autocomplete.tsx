import { Paper, List, ListItem, SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import React, { FunctionComponent } from "react";

export type TAutocompleteItem = {
   keys: string[];
   value: any;
   content: string | JSX.Element;
};

interface TAutocompleteProps {
   items: TAutocompleteItem[];
   top: number;
   left: number;
   selectedIndex: number;
   onClick: (selectedIndex: number) => void;
   sx?: SxProps<Theme> | undefined;
}

export const Autocomplete: FunctionComponent<TAutocompleteProps> = ({ selectedIndex, items, onClick, left, top, sx }) => {
   if (!items.length) {
      return null;
   }

   return (
      <Paper
         sx={{
            minWidth: "200px",
            position: "absolute",
            zIndex: 10,
            ...sx,
            top,
            left,
         }}
      >
         <List dense={true}>
            {items.map((item, index) => (
               <ListItem key={index} sx={{ cursor: "pointer" }} selected={index === selectedIndex} onClick={() => onClick(index)}>
                  {item.content}
               </ListItem>
            ))}
         </List>
      </Paper>
   );
};
