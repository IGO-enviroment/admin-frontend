import { Configuration } from "webpack";
import { BuildOptions } from "../types";

export const buildResolvers = (options: BuildOptions): Configuration["resolve"] => {
   const { paths } = options;
   return {
      extensions: [".tsx", ".ts", ".js"],
      preferAbsolute: true,
      modules: [paths.src, "node_modules"],
      alias: {
         "@": paths.src,
      },
      mainFiles: ["index"],
   };
};