import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

export const MultiPhotoInput = () => {

    const [images, setImage] = useState<string[]>([])

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(Array.from(event.target.files).map((file) => URL.createObjectURL(file)))
            // setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <div>

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                multiple
                onChange={onImageChange}
            />
            <label htmlFor="image-upload">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadRoundedIcon />}
                >
                    Upload Image
                </Button>
            </label>
            <p>
                {
                    images && (
                        <>
                            {images.map((image) => <img src={image} alt="Uploaded" width="200" height="200" />)}
                        </>

                    )
                }
            </p>
        </div>
    )
}