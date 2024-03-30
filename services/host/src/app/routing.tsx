import { Route, Routes } from "react-router-dom";
// eslint-disable-next-line import/no-internal-modules
import MUIEditor from "@/shared/text-editor/editor/editor";

export const Routing = () => {
   return (
      <Routes>
         <Route path="/" element={<MUIEditor />}></Route>
      </Routes>
   );
};
