import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useFieldArray, useForm } from "react-hook-form";
import { TextEditor } from "@/features/editors/text-editor";
import { ControlledForm } from "@/shared/controlled-form";
import Box from "@mui/material/Box";
import { FC, Fragment, ReactNode, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PhotoInput } from "@/features/editors/photoInput";
import { FileInput } from "@/features/editors/video-input";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const formVariants = {

   photo: 'Добавить фото',

   text: 'Добавить текст',

   file: 'Добавить файл'
}


export const ContentForm = () => {
   const methods = useForm();


const [fields, setFields] = useState<{field: ReactNode, id: number}[]>([])

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setIsMenuOpen(true)
   };
   const handleClose = () => {
      setAnchorEl(null);
      setIsMenuOpen(false)
   };

   const addPhotoForm = () => {
      const photoField = <PhotoInput name="dad" />
      setFields(prev => [...prev, {field: photoField, id: Math.random() * 10000}])
   }


   const addTextForm = () => {
      const textField = <TextEditor />
      setFields(prev => [...prev, {field:textField, id: Math.random() * 10000}])
   }


   const addVideoFile = () => {
      const videoField = <FileInput />
      setFields(prev => [...prev, {field: videoField, id: Math.random() * 10000}])
   }

   const handleClear = (index: number) => {
      console.log(fields)
      console.log(index)
      console.log(fields.slice(0, index).concat(fields.slice(index + 1)))
      setFields(prev => prev.slice(0, index).concat(fields.slice(index + 1)))
   }

   return (
      <Box sx={{ mx: "60px" }}>
         <ControlledForm methods={methods}>
            <Stack sx={{ gap: "30px", alignContent: "flex-start", alignItems: "flex-start" }}>
               {fields?.map((field, index) => (
                  <FieldWrapper key={field.id} onClear={() => handleClear(index)}>
                     {index}{field.field} 
                  </FieldWrapper>
               ))}
               <Button onClick={handleClick}>Добавить форму</Button>
               <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleClose}
               >
                  <MenuItem onClick={addPhotoForm}>{formVariants.photo}</MenuItem>
                  <MenuItem onClick={addTextForm}>{formVariants.text}</MenuItem>
                  <MenuItem onClick={addVideoFile}>{formVariants.file}</MenuItem>
               </Menu>
            </Stack>
         </ControlledForm>
      </Box>
   );
};

interface FieldWrapperProps {
   children: ReactNode
   onClear: () => void
}

const FieldWrapper: FC<FieldWrapperProps> = ({ children, onClear }) => {
   return (
      <Box>
         <IconButton onClick={onClear}>
            <ClearRoundedIcon/>
         </IconButton>
         {children}
      </Box>
   )
}