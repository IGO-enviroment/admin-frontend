import {Configuration } from "webpack";

export interface BuildPaths{
    entry: string;
    html: string;
    output: string;
    src: string
}

export type BuildMode = Configuration['mode']

export interface BuildOptions{
    port: number;
    paths: BuildPaths
    mode: Configuration['mode'],
    isDev: boolean,
    // @todo убрать any.
    packageJson: any,
    moduleFederationOptions?: {
        remotes?: Record<string, string>,
        exposes?: Record<string, string>,
    },
    resolve?: any
}