import { Route, Routes } from "react-router-dom";
import { ContentForm } from "@/widget/content-form";
import { TextEditor } from "@/features/editors/text-editor";
import { AppLayout } from "@/widget/AppLayout";
import { Appbar } from "@/widget/appbar";

export const Routing = () => {
   return (
      <>
         <Appbar />
         <Routes>
            <Route path="/" element={<h1>Рутовая страница</h1>}></Route>
            <Route path="/text" element={<TextEditor />}></Route>
            <Route path="/form" element={<ContentForm />}></Route>
         </Routes>
      </>
   );
};
