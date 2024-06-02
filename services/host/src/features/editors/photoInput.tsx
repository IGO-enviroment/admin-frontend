import { Button } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Controller, useFormContext } from "react-hook-form";


interface PhotoInputProp {
    name: string
}
export const PhotoInput: FC<PhotoInputProp> = ({ name }) => {

    const methods = useFormContext()

    const [image, setImage] = useState(null)

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            methods.setValue(name, event.target.files[0])
        }
    }

    return (
        <Controller
            control={methods.control}
            name={name}
            // rules={{ required: "Recipe picture is required" }}
            render={({ field: { value, onChange, ...field } }) => {
                return (
                    <>
                        <input
                            {...field}
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`image-upload-${name}`}
                            type="file"
                            onChange={onImageChange}
                        />
                        <label htmlFor={`image-upload-${name}`}>
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<CloudUploadRoundedIcon />}
                            >
                                Upload Image
                            </Button>
                        </label>
                        <p>{image && (
                            <img src={image} alt="Uploaded" width="200" height="200" />
                        )}</p>
                    </>
                );
            }}
        />

    )
}