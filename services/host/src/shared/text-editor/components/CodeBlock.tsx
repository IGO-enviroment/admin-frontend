import React, { FunctionComponent } from "react";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface IBlockquoteProps {
   children?: React.ReactNode;
}

const CodeBlock: FunctionComponent<IBlockquoteProps> = ({ children }) => {
   return (
      <Box
         sx={{
            backgroundColor: ({ palette }: Theme) => palette.grey[200],
            padding: ({ spacing }: Theme) => spacing(1, 2, 1, 2),
         }}
      >
         {children}
      </Box>
   );
};
