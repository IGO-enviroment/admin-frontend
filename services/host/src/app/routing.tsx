import { Route, Routes } from "react-router-dom";
import { ContentForm } from "@/widget/content-form";
import { TextEditor } from "@/features/editors/text-editor";

export const Routing = () => {
   return (
      <Routes>
         <Route path="/" element={<h1>Рутовая страница</h1>}></Route>
         <Route path="/text" element={<TextEditor />}></Route>
         <Route path="/form" element={<ContentForm />}></Route>
      </Routes>
   );
};
