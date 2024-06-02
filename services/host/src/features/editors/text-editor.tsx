import { Editor } from "@/shared/text-editor";

export const TextEditor = () => {
   const handleSave = (data: string) => {
      console.log(data);
      console.log(JSON.parse(data));
   };
   return <Editor onSave={handleSave} controls={controls} />;
};

const controls = [
   "title", "bold", "italic"
   , "underline"
   , "link"
   , "numberList"
   , "bulletList"
   , "quote"
   , "code"
   , "clear"
   , "save"
   , "strikethrough"
   , "highlight"
]