import { Theme } from "@mui/material/styles";
import { createStyles } from "@mui/styles";
import { TMUIRichTextEditorStyles } from "../models";

export const styles = (theme: Theme & TMUIRichTextEditorStyles) =>
   createStyles({
      root: theme?.overrides?.MUIRichTextEditor?.root || {},
      container: theme?.overrides?.MUIRichTextEditor?.container || {
         margin: theme.spacing(1, 0, 0, 0),
         position: "relative",
         fontFamily: theme.typography.body1.fontFamily,
         fontSize: theme.typography.body1.fontSize,
         "& figure": {
            margin: 0,
         },
      },
      inheritFontSize: theme?.overrides?.MUIRichTextEditor?.inheritFontSize || {
         fontSize: "inherit",
      },
      editor: theme?.overrides?.MUIRichTextEditor?.editor || {},
      editorContainer: theme?.overrides?.MUIRichTextEditor?.editorContainer || {
         margin: theme.spacing(1, 0, 0, 0),
         cursor: "text",
         width: "100%",
         padding: theme.spacing(0, 0, 1, 0),
      },
      editorReadOnly: theme?.overrides?.MUIRichTextEditor?.editorReadOnly || {
         borderBottom: "none",
      },
      error: theme?.overrides?.MUIRichTextEditor?.error || {
         borderBottom: "2px solid red",
      },
      hidePlaceholder: theme?.overrides?.MUIRichTextEditor?.hidePlaceholder || {
         display: "none",
      },
      placeHolder: theme?.overrides?.MUIRichTextEditor?.placeHolder || {
         color: theme.palette.grey[600],
         position: "absolute",
         outline: "none",
      },
      linkPopover: theme?.overrides?.MUIRichTextEditor?.linkPopover || {
         padding: theme.spacing(2, 2, 2, 2),
      },
      linkTextField: theme?.overrides?.MUIRichTextEditor?.linkTextField || {
         width: "100%",
      },
      anchorLink: theme?.overrides?.MUIRichTextEditor?.anchorLink || {},
      toolbar: theme?.overrides?.MUIRichTextEditor?.toolbar || {},
      inlineToolbar: theme?.overrides?.MUIRichTextEditor?.inlineToolbar || {
         maxWidth: "180px",
         position: "absolute",
         padding: "5px",
         zIndex: 10,
      },
   });
