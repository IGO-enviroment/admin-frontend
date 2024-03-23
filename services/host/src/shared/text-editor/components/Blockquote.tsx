import { FC, ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface IBlockquoteProps {
   children?: ReactNode;
}

export const Blockquote: FC<IBlockquoteProps> = ({ children }) => {
   return (
      <Box
         sx={{
            fontStyle: "italic",
            color: ({ palette }: Theme) => palette.grey[800],
            borderLeft: ({ palette }: Theme) => `4px solid ${palette.grey.A100}`,
         }}
      >
         {children}
      </Box>
   );
};
