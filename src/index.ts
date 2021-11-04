import fs from 'fs'
import { FS, JFReadOptions, JFWriteOptions, readFile, writeFile } from 'jsonfile'
import { join } from 'path'
import { JsonValue, PackageJson, TsConfigJson } from 'type-fest'
import { parseJsoncString } from './parseJsonc'

type JSONFileReadOptions = Extract<JFReadOptions, Record<string, any>>
type JSONFileWriteOptions = Extract<JFWriteOptions, Record<string, any>>

// todo support uri
export const readJsonFile = async <T>(
    path: string,
    options?: JSONFileReadOptions & {
        /**
         * Support reading .jsonc files
         * @default if path ends with .jsonc `true`, otherwise `false` */
        jsonc?: boolean
    },
): Promise<T> => {
    const jsonc = 'jsonc' in (options ?? {}) ? options!.jsonc : path.endsWith('.jsonc')
    if (jsonc) return parseJsoncString(await fs.promises.readFile(path, 'utf-8'))
    return readFile(path, options)
}

// TODO undefiend values, as always
export const writeJsonFile = <T extends JsonValue>(path: string, object: T, options?: JSONFileWriteOptions): Promise<void> => writeFile(path, object, options)

export const readPackageJsonFile = (path: string | { dir: string }, options?: JSONFileReadOptions): Promise<PackageJson> => {
    if (typeof path === 'object') path = join(path.dir, 'package.json')
    return readFile(path, options)
}

export const writePackageJsonFile = (path: string | { dir: string }, packageJson: PackageJson, options?: JSONFileWriteOptions): Promise<void> => {
    if (typeof path === 'object') path = join(path.dir, 'package.json')
    return writeFile(path, packageJson, options)
}

export const readTsconfigJsonFile = async (
    path: string | { dir: string },
    {
        errorTolerant,
    }: {
        /** Whether try to ignore syntax errors
         * @default false */
        errorTolerant?: boolean
    } = {},
): Promise<TsConfigJson> => {
    if (typeof path === 'object') path = join(path.dir, 'tsconfig.json')
    const jsonc = await fs.promises.readFile(path, 'utf-8')
    return parseJsoncString(jsonc, errorTolerant)
}

export const writeTsconfigJsonFile = (path: string | { dir: string }, tsconfigJson: TsConfigJson, options?: JSONFileWriteOptions): Promise<void> => {
    if (typeof path === 'object') path = join(path.dir, 'tsconfig.json')
    return writeFile(path, tsconfigJson, options)
}
