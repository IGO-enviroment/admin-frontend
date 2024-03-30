import { CSSProperties, CreateCSSProperties, PropsFunc } from "@mui/styles";
import { DraftHandleValue, EditorState, SelectionState } from "draft-js";
import { FunctionComponent } from "react";
import { TAutocompleteItem, TCustomControl, TToolbarButtonSize, TToolbarControl } from "../../components";

export type TDecorator = {
   component: FunctionComponent;
   regex: RegExp;
};

export type TAutocompleteStrategy = {
   triggerChar: string;
   items: TAutocompleteItem[];
   insertSpaceAfter?: boolean;
   atomicBlockName?: string;
};

export type TAutocomplete = {
   strategies: TAutocompleteStrategy[];
   suggestLimit?: number;
};

export type TAsyncAtomicBlockResponse = {
   data: any;
};

export type TMUIRichTextEditorRef = {
   focus: () => void;
   save: () => void;
   /**
    * @deprecated Use `insertAtomicBlockSync` instead.
    */
   insertAtomicBlock: (name: string, data: any) => void;
   insertAtomicBlockSync: (name: string, data: any) => void;
   insertAtomicBlockAsync: (name: string, promise: Promise<TAsyncAtomicBlockResponse>, placeholder?: string) => void;
};

export type TDraftEditorProps = {
   spellCheck?: boolean;
   stripPastedStyles?: boolean;
   handleDroppedFiles?: (selectionState: SelectionState, files: Blob[]) => DraftHandleValue;
};

export type TKeyCommand = {
   key: number;
   name: string;
   callback: (state: EditorState) => EditorState;
};

export type TMUIRichTextEditorProps = {
   id?: string;
   defaultValue?: any;
   label?: string;
   readOnly?: boolean;
   inheritFontSize?: boolean;
   error?: boolean;
   controls?: Array<TToolbarControl>;
   customControls?: TCustomControl[];
   decorators?: TDecorator[];
   toolbar?: boolean;
   toolbarButtonSize?: TToolbarButtonSize;
   inlineToolbar?: boolean;
   inlineToolbarControls?: Array<TToolbarControl>;
   draftEditorProps?: TDraftEditorProps;
   keyCommands?: TKeyCommand[];
   maxLength?: number;
   autocomplete?: TAutocomplete;
   onSave?: (data: string) => void;
   onChange?: (state: EditorState) => void;
   onFocus?: () => void;
   onBlur?: () => void;
   classes?: any;
};

export interface TMUIRichTextEditorStyles {
   overrides?: {
      MUIRichTextEditor?: {
         root?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         container?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         inheritFontSize?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         editor?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         editorContainer?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         editorReadOnly?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         error?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         hidePlaceholder?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         placeHolder?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         linkPopover?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         linkTextField?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         anchorLink?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         toolbar?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
         inlineToolbar?: CSSProperties | CreateCSSProperties<object> | PropsFunc<object, CreateCSSProperties<object>>;
      };
   };
}
