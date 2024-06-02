import { Button } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Controller, useFormContext } from "react-hook-form";


interface MultiPhotoInputProp {
    name: string
}

export const MultiPhotoInput: FC<MultiPhotoInputProp> = ({ name }) => {

    const methods = useFormContext()

    const [images, setImage] = useState<string[]>([])

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            setImage(Array.from(event.target.files).map((file) => URL.createObjectURL(file)))
            console.log(Array.from(event.target.files).map((file) => URL.createObjectURL(file)))
            methods.setValue(name, event.target.files)
            // setImage(URL.createObjectURL(event.target.files[0]));
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
                            multiple
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

                        {
                            images && (
                                <>
                                    {images.map((image) => <img src={image} key={image} alt="Uploaded" width="200" height="200" />)}
                                </>

                            )
                        }

                    </>
                );
            }}
        />
    )
}