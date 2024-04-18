import { Editor } from "@/shared/text-editor";

export const TextEditor = () => {
   const handleSave = (data: string) => {
      console.log(data);
      console.log(JSON.parse(data));
   };
   return <Editor onSave={handleSave} controls={["media", "save"]} />;
};
