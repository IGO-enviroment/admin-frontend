import { palette } from './palette';
import { createTheme } from '@mui/material';
import { typography } from "./typography";
import { shape } from "./shape";
import { components } from "./components";

export const theme = createTheme({
    typography,
    palette,
    shape,
    components
});
