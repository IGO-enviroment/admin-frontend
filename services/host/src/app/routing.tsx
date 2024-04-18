import { Route, Routes } from "react-router-dom";
import { TextEditor } from "@/features/editors/text-editor";

export const Routing = () => {
   return (
      <Routes>
         <Route path="/" element={<h1>Рутовая страница</h1>}></Route>
         <Route path="/text" element={<TextEditor />}></Route>
      </Routes>
   );
};
