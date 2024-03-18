import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import "../shared/fonts/fonts.css";
import { store } from "@/features/redux";
import { theme } from "../shared/theme";
import { Routing } from "./routing";

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