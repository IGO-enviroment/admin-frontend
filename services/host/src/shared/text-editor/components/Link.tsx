import React, { FunctionComponent } from "react";
import { ContentState } from "draft-js";
import { Link as MuiLink } from "@mui/material";

type TLinkProps = {
   contentState: ContentState;
   entityKey: string;
   children?: React.ReactNode;
};

export const Link: FunctionComponent<TLinkProps> = ({ contentState, entityKey, children }) => {
   const { url, className } = contentState.getEntity(entityKey).getData();
   return (
      <MuiLink href={url} className={`${className} editor-anchor`} target="_blank">
         {children}
      </MuiLink>
   );
};
