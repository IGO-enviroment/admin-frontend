import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../shared/theme";
import { Routing } from "./routing.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "../shared/fonts/fonts.css";
import { store } from "../features/redux";

export const App = () => {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <CssBaseline />
            <ThemeProvider theme={theme}>
               <Routing />
            </ThemeProvider>
         </BrowserRouter>
      </Provider>
   );
};