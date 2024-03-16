import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "../types";

export const buildDevServer = (options: BuildOptions): WebpackDevServerConfiguration => {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
}