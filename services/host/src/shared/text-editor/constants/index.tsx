import { DraftStyleMap } from "draft-js";
import Immutable from "immutable";
import React from "react";
import { Blockquote, CodeBlock } from "../components";

export const blockRenderMap = Immutable.Map({
   blockquote: {
      element: "blockquote",
      wrapper: <Blockquote />,
   },
   "code-block": {
      element: "pre",
      wrapper: <CodeBlock />,
   },
});
export const styleRenderMap: DraftStyleMap = {
   STRIKETHROUGH: {
      textDecoration: "line-through",
   },
   HIGHLIGHT: {
      backgroundColor: "yellow",
   },
};
