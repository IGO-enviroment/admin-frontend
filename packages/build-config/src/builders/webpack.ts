import { Configuration } from "webpack";
import { buildDevServer } from "./dev-server";
import { buildLoaders } from "./loaders";
import { buildPlugins } from "./plugins";
import { buildResolvers } from "./resolvers";
import { BuildOptions } from "../types";

export const buildWebpack = (options: BuildOptions): Configuration => {
    return {
        mode: options.mode,
        entry: options.paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: options.paths.output,
            clean: true,
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: options.isDev ? 'eval-cheap-module-source-map' : 'source-map',
        ...(options.isDev && {
            devServer: buildDevServer(options)
        })
    }
}