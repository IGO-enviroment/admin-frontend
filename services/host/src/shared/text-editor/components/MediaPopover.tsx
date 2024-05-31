import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeft from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRight from "@mui/icons-material/FormatAlignRight";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MovieIcon from "@mui/icons-material/Movie";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { TUrlData } from "@/shared/text-editor/components/UrlPopover";

interface MediaPopoverProps {
   data: TUrlData;
   setData: Dispatch<SetStateAction<TUrlData>>;
}

export const MediaPopover: FC<MediaPopoverProps> = ({ data, setData }) => {
   const [image, setImage] = useState<any>();
   const [imageURL, setImageURL] = useState<any>();
   const fileReader = new FileReader();
   fileReader.onloadend = () => {
      setImageURL(fileReader.result);
   };
   const handleOnChange = (event: any) => {
      event.preventDefault();
      if (event.target.files && event.target.files.length) {
         const file = event.target.files[0];
         setImage(file);
         fileReader.readAsDataURL(file);
      }
   };

   const handleDrop = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer.files && event.dataTransfer.files.length) {
         setImage(event.dataTransfer.files[0]);
         fileReader.readAsDataURL(event.dataTransfer.files[0]);
      }
   };

   const handleDragEmpty = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
   };
   return (
      <>
         <Grid item xs={12}>
            <ButtonGroup fullWidth>
               <Button
                  color={!data.type || data.type === "image" ? "primary" : "inherit"}
                  size="small"
                  onClick={() => setData({ ...data, type: "image" })}
               >
                  <InsertPhotoIcon />
               </Button>
               <Button
                  color={data.type === "video" ? "primary" : "inherit"}
                  size="small"
                  onClick={() => setData({ ...data, type: "video" })}
               >
                  <MovieIcon />
               </Button>
            </ButtonGroup>
         </Grid>
         {/*<InputLabel*/}
         {/*   htmlFor="file-loader-button"*/}
         {/*   sx={{ cursor: " pointer", backgroundColor: " yellow", border: "1px solid black", borderRadius: "12px", padding: "20px" }}*/}
         {/*>*/}
         {/*   Загрузить файл*/}
         {/*</InputLabel>*/}
         {/*<Input id="file-loader-button" type="file" sx={{ opacity: "0", position: "absolute", zIndex: "-1" }} onChange={handleOnChange} />*/}
         {/*<img*/}
         {/*   style={{ width: "200px", height: " 200px", border: "1px dashed gray", borderRadius: "12px" }}*/}
         {/*   src={imageURL ? imageURL : "no_photo.jpg"}*/}
         {/*   alt="preview"*/}
         {/*   onDrop={handleDrop}*/}
         {/*   onDragEnter={handleDragEmpty}*/}
         {/*   onDragOver={handleDragEmpty}*/}
         {/*/>*/}
         {/*<Box>{image ? image.name : ""}</Box>*/}
      </>
   );
};
