import { Route, Routes } from "react-router-dom";
// eslint-disable-next-line import/no-internal-modules
import MUIEditor from "@/shared/text-editor/editor/editor";

export const Routing = () => {
   const handleSave = (data: string) => {
      console.log(data);
      console.log(JSON.parse(data));
   };
   return (
      <Routes>
         <Route path="/" element={<MUIEditor onSave={handleSave} />}></Route>
      </Routes>
   );
};
