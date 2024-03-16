import {Configuration} from "webpack";
import {BuildOptions} from "../types";

export const buildResolvers = (options: BuildOptions): Configuration['resolve'] => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}