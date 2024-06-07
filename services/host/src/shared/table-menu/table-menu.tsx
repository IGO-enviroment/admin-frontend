import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import { FC } from "react";

const ITEM_HEIGHT = 48;

interface LongMenuProp {
   onEditClick: () => void;
   onDeleteClick: () => void;
}

export const LongMenu: FC<LongMenuProp> = ({ onDeleteClick, onEditClick }) => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Box sx={{ position: "absolute", right: "0" }}>
         <IconButton onClick={handleClick}>
            <MoreVertIcon />
         </IconButton>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "150px",
               },
            }}
         >
            <MenuItem onClick={onEditClick}>Редактировать</MenuItem>
            <MenuItem onClick={onDeleteClick}>Удалить</MenuItem>
         </Menu>
      </Box>
   );
};
