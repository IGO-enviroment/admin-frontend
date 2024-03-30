import { CompositeDecorator, convertFromRaw, DraftDecorator, EditorState } from "draft-js";
import { Link } from "../../components";
import { findDecoWithRegex, findLinkEntities, IMUIRichTextEditorProps } from "../editor";

export const createEditorState = (props: IMUIRichTextEditorProps) => {
   const decorators: DraftDecorator[] = [
      {
         strategy: findLinkEntities,
         component: Link,
      },
   ];
   if (props.decorators) {
      props.decorators.forEach((deco) =>
         decorators.push({
            strategy: (contentBlock: any, callback: any) => {
               findDecoWithRegex(deco.regex, contentBlock, callback);
            },
            component: deco.component,
         }),
      );
   }
   const decorator = new CompositeDecorator(decorators);
   const defaultValue = props.defaultValue;
   return defaultValue
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)), decorator)
      : EditorState.createEmpty(decorator);
};
