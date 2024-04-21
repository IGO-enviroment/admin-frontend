import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { withStyles } from "@mui/styles";
import classNames from "classnames";
import {
   AtomicBlockUtils,
   ContentBlock,
   convertToRaw,
   DefaultDraftBlockRenderMap,
   DraftBlockRenderMap,
   DraftEditorCommand,
   DraftHandleValue,
   DraftStyleMap,
   Editor,
   EditorState,
   getDefaultKeyBinding,
   KeyBindingUtil,
   Modifier,
   RichUtils,
   SelectionState,
} from "draft-js";
import Immutable from "immutable";
import React, { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState } from "react";
import Media from "@/shared/text-editor/components/Media";
import { TAlignment, TMediaType, Toolbar, TUrlData, UrlPopover } from "../components";
import { blockRenderMap, styleRenderMap } from "../constants";
import {
   atomicBlockExists,
   clearInlineStyles,
   getEditorBounds,
   getSelectionInfo,
   isGreaterThan,
   removeBlockFromMap,
   TPosition,
} from "../utils";
import { TAsyncAtomicBlockResponse, TMUIRichTextEditorProps, TMUIRichTextEditorRef } from "./models";
import { styles } from "./styles";
import { createEditorState } from "./utils";

export interface IMUIRichTextEditorProps extends TMUIRichTextEditorProps {}

type TMUIRichTextEditorState = {
   anchorUrlPopover?: HTMLElement;
   urlKey?: string;
   urlData?: TUrlData;
   urlIsMedia?: boolean;
   toolbarPosition?: TPosition;
};

type TStateOffset = {
   start: number;
   end: number;
};

const { hasCommandModifier } = KeyBindingUtil;
const defaultInlineToolbarControls = ["bold", "italic", "underline", "clear"];

export const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
   contentBlock.findEntityRanges((character: any) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
   }, callback);
};

export const findDecoWithRegex = (regex: RegExp, contentBlock: any, callback: any) => {
   const text = contentBlock.getText();
   let matchArr, start;
   while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
   }
};

const MUIEditor: ForwardRefRenderFunction<TMUIRichTextEditorRef, IMUIRichTextEditorProps> = (props, ref) => {
   const { classes, controls, customControls } = props;

   const [state, setState] = useState<TMUIRichTextEditorState>({});
   const [focus, setFocus] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [editorState, setEditorState] = useState(() => createEditorState(props));
   const [focusMediaKey, setFocusMediaKey] = useState("");

   const editorRef = useRef<Editor>(null);
   const editorId = props.id || "mui-rte";
   const toolbarPositionRef = useRef<TPosition | undefined>(undefined);
   const editorStateRef = useRef<EditorState | null>(editorState);
   const isFirstFocus = useRef(true);
   const customBlockMapRef = useRef<DraftBlockRenderMap | undefined>(undefined);
   const customStyleMapRef = useRef<DraftStyleMap | undefined>(undefined);
   const isFocusedWithMouse = useRef(false);
   const selectionRef = useRef<TStateOffset>({
      start: 0,
      end: 0,
   });

   /**
    * Открытые методы
    */
   useImperativeHandle(ref, () => ({
      focus: () => {
         handleFocus();
      },
      save: () => {
         handleSave();
      },
      insertAtomicBlockSync: (name: string, data: any) => {
         handleInsertAtomicBlockSync(name, data);
      },
      insertAtomicBlockAsync: (name: string, promise: Promise<TAsyncAtomicBlockResponse>, placeholder?: string) => {
         handleInsertAtomicBlockAsync(name, promise, placeholder);
      },
   }));

   useEffect(() => {
      const editorState = createEditorState(props);
      setEditorState(editorState);
      toggleMouseUpListener(true);
      return () => {
         toggleMouseUpListener();
      };
   }, [props.defaultValue]);

   useEffect(() => {
      if (props.onChange) {
         props.onChange(editorState);
      }
      editorStateRef.current = editorState;
   }, [editorState]);

   useEffect(() => {
      toolbarPositionRef.current = state.toolbarPosition;
   }, [state.toolbarPosition]);

   const clearSearch = () => {
      setSearchTerm("");
   };

   const handleMouseUp = (event: any) => {
      const nodeName = event.target.nodeName;
      clearSearch();
      if (nodeName === "IMG" || nodeName === "VIDEO") {
         return;
      }
      setTimeout(() => {
         const selection = editorStateRef.current!.getSelection();
         if (
            selection.isCollapsed() ||
            (toolbarPositionRef !== undefined &&
               selectionRef.current.start === selection.getStartOffset() &&
               selectionRef.current.end === selection.getEndOffset())
         ) {
            const selectionInfo = getSelectionInfo(editorStateRef.current!);
            if (selectionInfo.entityType === "IMAGE") {
               focusMedia(selectionInfo.block);
               return;
            }
            setState({
               ...state,
               toolbarPosition: undefined,
            });
            return;
         }

         selectionRef.current = {
            start: selection.getStartOffset(),
            end: selection.getEndOffset(),
         };

         const editor: HTMLElement = (editorRef.current as any)?.editor;
         if (!editor) {
            return;
         }
         const { editorRect, selectionRect } = getEditorBounds(editor);
         if (!selectionRect) {
            return;
         }
         const position = {
            top: editor.offsetTop - 48 + (selectionRect.top - editorRect.top),
            left: editor.offsetLeft + (selectionRect.left - editorRect.left),
         };
         setState({
            ...state,
            toolbarPosition: position,
         });
      }, 1);
   };

   const handleChange = (state: EditorState) => {
      setEditorState(state);
   };

   const handleBeforeInput = (chars: string, editorState: EditorState): DraftHandleValue => {
      if (chars === " " && searchTerm.length) {
         clearSearch();
      }
      return isMaxLengthHandled(editorState, 1);
   };

   const handleEditorFocus = () => {
      handleFocus();
      if (isFocusedWithMouse.current === true) {
         isFocusedWithMouse.current = false;
         return;
      }
      const nextEditorState = EditorState.forceSelection(editorState, editorState.getSelection());
      setTimeout(() => setEditorState(EditorState.moveFocusToEnd(nextEditorState)), 0);
   };

   const handlePlaceholderFocus = () => {
      if (isFirstFocus.current === false) {
         focusEditor();
         return;
      }
      handleFocus();
      isFirstFocus.current = false;
   };

   const handleFocus = () => {
      focusEditor();
      if (props.onFocus) {
         props.onFocus();
      }
   };

   const focusEditor = () => {
      setFocus(true);
      setTimeout(() => editorRef.current?.focus(), 0);
   };

   const handleBlur = () => {
      isFocusedWithMouse.current = false;
      setFocus(false);
      if (props.onBlur) {
         props.onBlur();
      }

      if (!state.anchorUrlPopover) {
         setState({
            ...state,
            toolbarPosition: undefined,
         });
      }
   };

   const handleMouseDown = () => {
      isFocusedWithMouse.current = true;
   };

   const handleClearFormat = () => {
      if (customStyleMapRef.current === undefined) {
         return;
      }
      const withoutStyles = clearInlineStyles(editorState, customStyleMapRef.current);
      const selectionInfo = getSelectionInfo(editorState);
      const newEditorState = EditorState.push(editorState, withoutStyles, "change-inline-style");
      setEditorState(RichUtils.toggleBlockType(newEditorState, selectionInfo.blockType));
   };

   const handleSave = () => {
      if (props.onSave) {
         props.onSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
      }
   };

   const handleInsertAtomicBlockSync = (name: string, data: any) => {
      const block = atomicBlockExists(name, props.customControls);
      if (!block) {
         return;
      }
      const newEditorState = insertAtomicBlock(editorState, block.name.toUpperCase(), data, {
         selection: editorState.getCurrentContent().getSelectionAfter(),
      });
      updateStateForPopover(newEditorState);
   };

   const handleInsertAtomicBlockAsync = (name: string, promise: Promise<TAsyncAtomicBlockResponse>, placeholder?: string) => {
      const selection = insertAsyncAtomicBlockPlaceholder(name, placeholder);
      const offset = selection.getFocusOffset() + 1;
      const newSelection = selection.merge({
         focusOffset: offset,
      });

      promise
         .then((response) => {
            const newEditorState = insertAtomicBlock(editorStateRef.current!, name, response.data, {
               selection: newSelection,
            });
            handleChange(newEditorState);
         })
         .catch((error) => {
            if (error) {
               return;
            }
            const newContentState = Modifier.removeRange(
               editorStateRef.current!.getCurrentContent(),
               newSelection as SelectionState,
               "forward",
            );
            handleChange(EditorState.push(editorStateRef.current!, newContentState, "remove-range"));
         });
   };

   const insertAsyncAtomicBlockPlaceholder = (name: string, placeholder?: string): SelectionState => {
      const placeholderName = placeholder || name + "...";
      const currentContentState = editorStateRef.current!.getCurrentContent();
      const entityKey = currentContentState.createEntity("ASYNC_ATOMICBLOCK", "IMMUTABLE").getLastCreatedEntityKey();
      const contentState = Modifier.insertText(
         editorStateRef.current!.getCurrentContent(),
         currentContentState.getSelectionAfter(),
         placeholderName,
         undefined,
         entityKey,
      );

      const selection = currentContentState.getSelectionAfter();
      const newEditorState = EditorState.push(editorStateRef.current!, contentState, "insert-characters");
      handleChange(newEditorState);
      return selection;
   };

   const handleKeyCommand = (command: DraftEditorCommand | string, editorState: EditorState): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
         handleChange(newState);
         return "handled";
      } else {
         if (props.keyCommands) {
            const keyCommand = props.keyCommands.find((comm) => comm.name === command);
            if (keyCommand) {
               const newState = keyCommand.callback(editorState);
               handleChange(newState);
               return "handled";
            }
         }
      }
      return "not-handled";
   };

   const handleCustomClick = (style: any, id: string) => {
      if (!props.customControls) {
         return;
      }
      for (const control of props.customControls) {
         if (control.name.toUpperCase() === style) {
            if (control.onClick) {
               setTimeout(() => editorRef.current?.blur(), 0);
               const newState = control.onClick(editorState, control.name, document.getElementById(id));
               if (newState) {
                  if (newState.getSelection().isCollapsed()) {
                     setEditorState(newState);
                  } else {
                     updateStateForPopover(newState);
                  }
               } else {
                  if (!editorState.getSelection().isCollapsed()) {
                     refocus();
                  }
               }
            }
            break;
         }
      }
   };

   const handleUndo = () => {
      setEditorState(EditorState.undo(editorState));
   };

   const handleRedo = () => {
      setEditorState(EditorState.redo(editorState));
   };

   const handlePrompt = (lastState: EditorState, type: "link" | "media", inlineMode?: boolean) => {
      const selectionInfo = getSelectionInfo(lastState);
      const contentState = lastState.getCurrentContent();
      const linkKey = selectionInfo.linkKey;
      let data = undefined;
      if (linkKey) {
         const linkInstance = contentState.getEntity(linkKey);
         data = linkInstance.getData();
      }
      setState({
         urlData: data,
         urlKey: linkKey,
         toolbarPosition: !inlineMode ? undefined : state.toolbarPosition,
         anchorUrlPopover: !inlineMode
            ? document.getElementById(`${editorId}-${type}-control-button`)!
            : document.getElementById(`${editorId}-${type}-control-button-toolbar`)!,
         urlIsMedia: type === "media" ? true : undefined,
      });
   };

   const handlePromptForLink = (inlineMode?: boolean) => {
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) {
         handlePrompt(editorState, "link", inlineMode);
      }
   };

   const handlePromptForMedia = (inlineMode?: boolean, newState?: EditorState) => {
      const lastState = newState || editorState;
      handlePrompt(lastState, "media", inlineMode);
   };

   const handleConfirmPrompt = (isMedia?: boolean, ...args: any) => {
      if (isMedia) {
         confirmMedia(...args);
         return;
      }
      confirmLink(...args);
   };

   const handleToolbarClick = (style: string, type: string, id: string, inlineMode?: boolean) => {
      console.log(type);
      console.log(style);
      if (type === "inline") {
         return toggleInlineStyle(style);
      }
      if (type === "block") {
         return toggleBlockType(style);
      }
      switch (style) {
         case "UNDO":
            handleUndo();
            break;
         case "REDO":
            handleRedo();
            break;
         case "LINK":
            handlePromptForLink(inlineMode);
            break;
         case "IMAGE":
            handlePromptForMedia(inlineMode);
            break;
         case "clear":
            handleClearFormat();
            break;
         case "save":
            handleSave();
            break;
         default:
            handleCustomClick(style, id);
      }
   };

   const handlePastedText = (text: string, _html: string | undefined, editorState: EditorState): DraftHandleValue => {
      return isMaxLengthHandled(editorState, text.length);
   };

   const handleReturn = (_e: any, editorState: EditorState): DraftHandleValue => {
      return isMaxLengthHandled(editorState, 1);
   };

   const isMaxLengthHandled = (editorState: EditorState, nextLength: number): DraftHandleValue => {
      const currentLength = editorState.getCurrentContent().getPlainText("").length;
      return isGreaterThan(currentLength + nextLength, props.maxLength) ? "handled" : "not-handled";
   };

   const toggleMouseUpListener = (addAfter = false) => {
      const editor: HTMLElement = (editorRef.current as any)?.editor;
      if (!editor) {
         return;
      }
      editor.removeEventListener("mouseup", handleMouseUp);
      if (addAfter) {
         editor.addEventListener("mouseup", handleMouseUp);
      }
   };

   const removeLink = () => {
      const selection = editorState.getSelection();
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
   };

   const confirmLink = (url?: string) => {
      const { urlKey } = state;
      if (!url) {
         if (urlKey) {
            removeLink();
         }
         dismissPopover();
         return;
      }

      const contentState = editorState.getCurrentContent();
      let replaceEditorState = editorState;
      const data = {
         url: url,
         className: classes.anchorLink,
      };

      if (urlKey) {
         contentState.replaceEntityData(urlKey, data);
         replaceEditorState = EditorState.push(editorState, contentState, "apply-entity");
      } else {
         const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", data);
         const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
         const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
         replaceEditorState = RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
      }
      updateStateForPopover(replaceEditorState);
   };

   const removeMedia = () => {
      const blockKey = editorState.getSelection().getStartKey();
      const contentState = editorState.getCurrentContent();
      const mediaBlock = contentState.getBlockForKey(blockKey);
      const newContentState = removeBlockFromMap(editorState, mediaBlock);
      const newEditorState = EditorState.push(editorState, newContentState, "remove-range");
      setEditorState(newEditorState);
   };

   const confirmMedia = (url?: string, width?: number, height?: number, alignment?: TAlignment, type?: TMediaType) => {
      // TODO медиа попапчик где-то тут
      const { urlKey } = state;
      console.group("PIZDA");
      console.log(editorState);
      console.log(urlKey);
      console.log(url);
      if (!url) {
         if (urlKey) {
            removeMedia();
         }
         dismissPopover();
         return;
      }

      const contentState = editorState.getCurrentContent();
      console.log(contentState);
      console.log(contentState.getAllEntities());

      const data = {
         url: url,
         width: width,
         height: height,
         alignment: alignment,
         type: type,
      };
      console.log(data);

      if (urlKey) {
         contentState.replaceEntityData(urlKey, data);

         const newEditorState = EditorState.push(editorState, contentState, "apply-entity");
         updateStateForPopover(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()));
      } else {
         const newEditorState = insertAtomicBlock(editorState, "IMAGE", data);
         console.log(newEditorState.getCurrentContent());
         updateStateForPopover(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()));
      }
      setFocusMediaKey("");
      console.groupEnd();
   };

   const updateStateForPopover = (editorState: EditorState) => {
      setEditorState(editorState);
      dismissPopover();
   };

   const dismissPopover = () => {
      refocus();
      setState({
         ...state,
         anchorUrlPopover: undefined,
         urlKey: undefined,
         urlIsMedia: undefined,
         urlData: undefined,
      });
   };

   const refocus = () => {
      setTimeout(() => editorRef.current?.blur(), 0);
      setTimeout(() => editorRef.current?.focus(), 1);
   };

   const toggleBlockType = (blockType: string) => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
   };

   const toggleInlineStyle = (inlineStyle: string) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
   };

   const focusMedia = (block: ContentBlock) => {
      const newSeletion = SelectionState.createEmpty(block.getKey());
      const newEditorState = EditorState.forceSelection(editorStateRef.current!, newSeletion);
      editorStateRef.current = newEditorState;
      setFocusMediaKey(block.getKey());
      setEditorState(newEditorState);
      handlePromptForMedia(false, newEditorState);
   };

   const getStyleMap = (): DraftStyleMap => {
      if (customStyleMapRef.current === undefined) {
         setupStyleMap();
      }
      return customStyleMapRef.current!;
   };

   const setupStyleMap = () => {
      const customStyleMap = JSON.parse(JSON.stringify(styleRenderMap));
      props.customControls
         ?.filter((control) => control.type === "inline" && control.inlineStyle)
         .forEach((control) => {
            customStyleMap[control.name.toUpperCase()] = control.inlineStyle;
         });
      customStyleMapRef.current = customStyleMap;
   };

   const getBlockMap = (): DraftBlockRenderMap => {
      if (customBlockMapRef.current === undefined) {
         setupBlockMap();
      }
      return customBlockMapRef.current!;
   };

   const setupBlockMap = () => {
      const customBlockMap: any = {};
      props.customControls
         ?.filter((control) => control.type === "block" && control.blockWrapper)
         .forEach((control) => {
            customBlockMap[control.name.toUpperCase()] = {
               element: "div",
               wrapper: control.blockWrapper,
            };
         });
      customBlockMapRef.current = DefaultDraftBlockRenderMap.merge(blockRenderMap, Immutable.Map(customBlockMap));
   };

   const blockRenderer = (contentBlock: ContentBlock) => {
      const blockType = contentBlock.getType();
      if (blockType === "atomic") {
         const contentState = editorState.getCurrentContent();
         const entity = contentBlock.getEntityAt(0);
         if (entity) {
            const type = contentState.getEntity(entity).getType();
            if (type === "IMAGE") {
               return {
                  component: Media,
                  editable: false,
                  props: {
                     onClick: focusMedia,
                     readOnly: props.readOnly,
                     focusKey: focusMediaKey,
                  },
               };
            } else {
               const block = atomicBlockExists(type.toLowerCase(), props.customControls);
               if (block) {
                  return {
                     component: block.atomicComponent,
                     editable: false,
                     props: contentState.getEntity(contentBlock.getEntityAt(0)).getData(),
                  };
               }
            }
         }
      }
      return null;
   };

   const styleRenderer = (style: any): React.CSSProperties => {
      const customStyleMap = getStyleMap();
      const styleNames = style.toJS();
      return styleNames.reduce((styles: any, styleName: string) => {
         styles = customStyleMap[styleName];
         return styles;
      }, {});
   };

   const insertAtomicBlock = (editorState: EditorState, type: string, data: any, options?: any) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(type, "IMMUTABLE", data);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorStateRaw = EditorState.set(editorState, {
         currentContent: contentStateWithEntity,
         ...options,
      });
      return AtomicBlockUtils.insertAtomicBlock(newEditorStateRaw, entityKey, " ");
   };

   const keyBindingFn = (e: React.KeyboardEvent<object>): string | null => {
      if (hasCommandModifier(e) && props.keyCommands) {
         const comm = props.keyCommands.find((comm) => comm.key === e.keyCode);
         if (comm) {
            return comm.name;
         }
      }

      const keyBinding = getDefaultKeyBinding(e);

      return keyBinding;
   };

   const renderToolbar = props.toolbar === undefined || props.toolbar;
   const inlineToolbarControls = props.inlineToolbarControls || defaultInlineToolbarControls;
   const editable = props.readOnly === undefined || !props.readOnly;
   let className = "";
   let placeholder: React.ReactElement | null = null;
   if (!focus) {
      const contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
         placeholder = (
            <div
               className={classNames(classes.editorContainer, classes.placeHolder, {
                  [classes.error]: props.error,
               })}
               tabIndex={0}
               onFocus={handlePlaceholderFocus}
            >
               {props.label || ""}
            </div>
         );
         className = classes.hidePlaceholder;
      }
   }

   return (
      <div id={`${editorId}-root`} className={classes.root}>
         <Box
            sx={{}}
            id={`${editorId}-container`}
            className={classNames(classes.container, {
               [classes.inheritFontSize]: props.inheritFontSize,
            })}
         >
            {props.inlineToolbar && editable && state.toolbarPosition ? (
               <Paper
                  className={classes.inlineToolbar}
                  style={{
                     top: state.toolbarPosition.top,
                     left: state.toolbarPosition.left,
                  }}
               >
                  <Toolbar
                     id={editorId}
                     editorState={editorState}
                     onClick={handleToolbarClick}
                     controls={inlineToolbarControls}
                     customControls={customControls}
                     inlineMode={true}
                     isActive={true}
                  />
               </Paper>
            ) : null}
            {renderToolbar ? (
               <Toolbar
                  id={editorId}
                  editorState={editorState}
                  onClick={handleToolbarClick}
                  controls={controls}
                  customControls={customControls}
                  className={classes.toolbar}
                  disabled={!editable}
                  size={props.toolbarButtonSize}
                  isActive={focus}
               />
            ) : null}
            {placeholder}
            <div id={`${editorId}-editor`} className={classes.editor}>
               <div
                  id={`${editorId}-editor-container`}
                  className={classNames(className, classes.editorContainer, {
                     [classes.editorReadOnly]: !editable,
                     [classes.error]: props.error,
                  })}
                  onMouseDown={handleMouseDown}
                  onBlur={handleBlur}
               >
                  <Editor
                     blockRenderMap={getBlockMap()}
                     blockRendererFn={blockRenderer}
                     customStyleFn={styleRenderer}
                     editorState={editorState}
                     onChange={handleChange}
                     onFocus={handleEditorFocus}
                     readOnly={props.readOnly}
                     handleKeyCommand={handleKeyCommand}
                     handleBeforeInput={handleBeforeInput}
                     handlePastedText={handlePastedText}
                     handleReturn={handleReturn}
                     keyBindingFn={keyBindingFn}
                     ref={editorRef}
                     {...props.draftEditorProps}
                  />
               </div>
            </div>
            {state.anchorUrlPopover ? (
               <UrlPopover
                  data={state.urlData}
                  anchor={state.anchorUrlPopover}
                  onConfirm={handleConfirmPrompt}
                  isMedia={state.urlIsMedia}
               />
            ) : null}
         </Box>
      </div>
   );
};

export default withStyles(styles, { withTheme: true, name: "MUIEditor" })(forwardRef(MUIEditor));
