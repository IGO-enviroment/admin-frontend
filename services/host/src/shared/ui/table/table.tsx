// import { default as MUITable } from "@mui/material/Table";
// import { Dispatch, MouseEvent, SetStateAction, useMemo, useState } from "react";
// import TableHeader from "@/components/ui/TableHeader/TableHeader";
// import { Order, IHeadCell } from "@/interfaces/tableTypes";
// import { color } from "@/style/mixins";
// import { Grade } from "@/interfaces/user";
// import { getChipColor } from "@/helpers/getChipColor";
// import CustomPagination from "@/components/ui/CustomPagination/CustomPagination";
// import OuterPaper from "@/components/blocks/OuterPaper/OuterPaper";
// import colors from "@/style/colors";
// import TableContainer from "@mui/material/TableContainer";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import Chip from "@mui/material/Chip";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
//
//
// type TableVerticalProps<DataType extends object> = {
//    headCells: IHeadCell<DataType>[];
//    rows: DataType[];
//    order: Order;
//    setOrder: Dispatch<SetStateAction<Order>>;
//    nameSortingOrderField: keyof DataType;
//    onRowClick?: (event?: MouseEvent<HTMLDivElement>, row?: DataType) => void;
// };
//
// /**
//  * @description Компонент, возвращающий вертикальную таблицу с заголовком
//  * @param order - Направление сортировки (asc - по возрастанию, desc - по убыванию)
//  * @param rows - массив строк таблицы
//  * @param headCells - массив заголовков таблицы
//  * @param setOrder - Диспатч-функция, меняющая направление сортировки
//  * @param nameSortingOrderField - Поле, по которому изначально задается сортировка
//  */
// export const Table = <T extends object>({
//                                            order,
//                                            rows,
//                                            headCells,
//                                            setOrder,
//                                            nameSortingOrderField,
//                                            onRowClick = () => {
//                                            },
//                                         }: TableVerticalProps<T>) => {
//    const [page, setPage] = useState(0);
//    const [rowsPerPage, setRowsPerPage] = useState(12);
//    const [orderBy, setOrderBy] = useState<keyof T>(nameSortingOrderField);
//    const visibleRows = useMemo(
//       () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//       [order, orderBy, page, rowsPerPage, rows],
//    );
//
//    const onRequestSort = (_event: MouseEvent<HTMLSpanElement>, property: keyof T) => {
//       const isAsc = orderBy === property && order === "asc";
//       setOrder(isAsc ? "desc" : "asc");
//       setOrderBy(property);
//       // запрос сортировки не бек
//    };
//
//    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
//
//    return (
//       <OuterPaper
//          sx={{
//             width: "100%",
//             marginBottom: "8px",
//             border: "1px solid",
//             borderColor: colors.grey10,
//          }}
//       >
//          <TableContainer component="div">
//             <MUITable aria-labelledby="tableTitle" component="div">
//                <TableHeader order={order} orderBy={orderBy} onRequestSort={onRequestSort} headCells={headCells} />
//                <TableBody component="div" sx={{ my: "8px" }}>
//                   {visibleRows.map((row, index) => {
//                      const rowValues = Object.values(row);
//
//                      return (
//                         <TableRow
//                            component="div"
//                            hover
//                            tabIndex={-1}
//                            onClick={(e: MouseEvent<HTMLDivElement>) => onRowClick(e, row)}
//                            key={`${rowValues[0]}_${index}`}
//                            sx={{
//                               cursor: "pointer",
//                               "&:first-child": {
//                                  "& .MuiTableCell-root": {
//                                     pt: "14px",
//                                  },
//                               },
//                               "&:last-child": {
//                                  "& .MuiTableCell-root": {
//                                     pb: "14px",
//                                  },
//                               },
//                               "& .MuiTableRow-hover": {
//                                  background: `${color("black", 0.04)}`,
//                               },
//                               "& .MuiTableCell-root:nth-child(1)": {
//                                  display: "flex",
//                                  gap: "20px",
//                               },
//                            }}
//                         >
//                            {Object.entries(row).map(([key, value], index) => {
//                               return (
//                                  <>
//                                     {key === "id" ? (
//                                        <></>
//                                     ) : (
//                                        <TableCell
//                                           sx={{ padding: "6px 32px", alignItems: "center", border: "none" }}
//                                           component="div"
//                                           scope="row"
//                                           key={`${value}${index}`}
//                                        >
//                                           {Object.values(Grade).includes(value) ? (
//                                              <Chip
//                                                 sx={{
//                                                    height: "fit-content",
//                                                    bgcolor: `${getChipColor(value)}`,
//                                                    "& .MuiChip-label": { padding: "2px 12px" },
//                                                    typography: "body2",
//                                                    color: colors.mainText,
//                                                 }}
//                                                 label={gradeTransform(value)}
//                                              />
//                                           ) : (
//                                              <>
//                                                 {key === "name" ? (
//                                                    <>
//                                                       <Avatar
//                                                          sx={{
//                                                             height: "36px",
//                                                             width: "36px",
//                                                             bgcolor: stringToColor(value.split(" ")[0]),
//                                                          }}
//                                                       >
//                                                          {getInitials(value)}
//                                                       </Avatar>
//                                                       <Typography variant="body2"
//                                                                   sx={{ color: colors.mainText }}>
//                                                          {value}
//                                                       </Typography>
//                                                    </>
//                                                 ) : (
//                                                    <Typography variant="body2"
//                                                                sx={{ color: colors.mainText }}>
//                                                       {value}
//                                                    </Typography>
//                                                 )}
//                                              </>
//                                           )}
//                                        </TableCell>
//                                     )}
//                                  </>
//                               );
//                            })}
//                         </TableRow>
//                      );
//                   })}
//                   {emptyRows > 0 && (
//                      <TableRow sx={{ height: 48 * emptyRows }} component="div">
//                         <TableCell colSpan={6} />
//                      </TableRow>
//                   )}
//                </TableBody>
//             </MUITable>
//          </TableContainer>
//          <CustomPagination rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} count={rows.length} page={page}
//                            setPage={setPage} />
//       </OuterPaper>
//    );
// };
//
