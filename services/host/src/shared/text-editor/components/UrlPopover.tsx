import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeft from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRight from "@mui/icons-material/FormatAlignRight";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MovieIcon from "@mui/icons-material/Movie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { FunctionComponent, useState } from "react";
import { MediaPopover } from "@/shared/text-editor/components/MediaPopover";

export type TAlignment = "left" | "center" | "right";

export type TMediaType = "image" | "video";

export type TUrlData = {
   url?: string;
   width?: number;
   height?: number;
   alignment?: TAlignment;
   type?: TMediaType;
};

interface IUrlPopoverStateProps {
   anchor?: HTMLElement;
   data?: TUrlData;
   isMedia?: boolean;
   onConfirm: (isMedia?: boolean, ...args: any) => void;
}

export const UrlPopover: FunctionComponent<IUrlPopoverStateProps> = (props) => {
   const [data, setData] = useState<TUrlData>(
      props.data || {
         url: undefined,
         width: undefined,
         height: undefined,
         alignment: undefined,
         type: undefined,
      },
   );

   const onSizeChange = (value: any, prop: "width" | "height") => {
      if (value === "") {
         setData({ ...data, [prop]: undefined });
         return;
      }
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
         return;
      }
      setData({ ...data, [prop]: intValue });
   };

   return (
      <Popover
         open={props.anchor !== undefined}
         anchorEl={props.anchor}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
         }}
         transformOrigin={{
            vertical: "top",
            horizontal: "left",
         }}
      >
         <Box
            sx={{
               padding: ({ spacing }: Theme) => spacing(2, 2, 2, 2),
               maxWidth: 250,
            }}
         >
            <Grid container spacing={1}>
               <Grid container item xs spacing={1}>
                  <Grid item xs={12}>
                     <TextField
                        sx={{
                           width: "100%",
                        }}
                        onChange={(event) => setData({ ...data, url: event.target.value })}
                        label="URL"
                        defaultValue={props.data && props.data.url}
                        autoFocus={true}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                  </Grid>
                  {props.isMedia ? <MediaPopover data={data} setData={setData} /> : null}
               </Grid>
               <Grid container item xs={12} direction="row" justifyContent="flex-end">
                  {props.data && props.data.url ? (
                     <Button onClick={() => props.onConfirm(props.isMedia, "")}>
                        <DeleteIcon />
                     </Button>
                  ) : null}
                  <Button onClick={() => props.onConfirm(props.isMedia, data.url, data.width, data.height, data.alignment, data.type)}>
                     <CheckIcon />
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Popover>
   );
};
