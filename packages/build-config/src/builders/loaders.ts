import { ModuleOptions } from "webpack";
import {BuildOptions} from "../types";

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
   const typescriptLoader = {
      test: /\.tsx?$/,
      use: [{
         loader: 'ts-loader',
         options: {
            transpileOnly: true
         }
      }],
      exclude: /node_modules/,
   }

   return [
      typescriptLoader
   ]
}