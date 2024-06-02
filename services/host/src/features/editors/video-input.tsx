import { Input } from "@mui/material";
import { ChangeEvent, useState } from "react";
import ReactPlayer from "react-player";

export const FileInput = () => {

    const [file, setFile] = useState(null)

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <div>
            <input type="file" onChange={onImageChange} className="filetype" />
        </div>
    )
}