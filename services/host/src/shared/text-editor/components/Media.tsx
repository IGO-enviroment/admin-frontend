// import React, { FunctionComponent } from "react";
// import classNames from "classnames";
// import { ContentState, ContentBlock } from "draft-js";
// import { createStyles, withStyles, WithStyles } from "@mui/styles";
// import { Theme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
//
// interface IMediaProps {
//    block: ContentBlock;
//    contentState: ContentState;
//    blockProps: any;
//    onClick: (block: ContentBlock) => void;
// }
//
// const styles = ({ shadows }: Theme) =>
//    createStyles({
//       root: {
//          margin: "5px 0 1px",
//          outline: "none",
//       },
//       editable: {
//          cursor: "pointer",
//          "&:hover": {
//             boxShadow: shadows[3],
//          },
//       },
//       focused: {
//          boxShadow: shadows[3],
//       },
//       centered: {
//          textAlign: "center",
//       },
//       leftAligned: {
//          textAlign: "left",
//       },
//       rightAligned: {
//          textAlign: "right",
//       },
//    });
//
// const Media: FunctionComponent<IMediaProps> = ({ blockProps, block, contentState, onClick }) => {
//    const { url, width, height, alignment, type } = contentState.getEntity(block.getEntityAt(0)).getData();
//    const { onClick: onBlockClick, readOnly, focusKey } = blockProps;
//
//    const Media = () => {
//       const componentProps = {
//          src: url,
//          className: classNames(classes.root, {
//             [classes.editable]: !readOnly,
//             [classes.focused]: !readOnly && focusKey === block.getKey(),
//          }),
//          width: width,
//          height: type === "video" ? "auto" : height,
//          onBlockClick: () => {
//             if (readOnly) {
//                return;
//             }
//             onBlockClick(block);
//          },
//       };
//
//       if (!type || type === "image") {
//          return <img {...componentProps} />;
//       }
//       if (type === "video") {
//          return <video {...componentProps} autoPlay={false} controls />;
//       }
//       return null;
//    };
//
//    return (
//       <Box
//          className={classNames({
//             [classes.centered]: alignment === "center",
//             [classes.leftAligned]: alignment === "left",
//             [classes.rightAligned]: alignment === "right",
//          })}
//       >
//          <Media />
//       </Box>
//    );
// };
