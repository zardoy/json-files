import fs from 'fs'
import { JFReadOptions, JFWriteOptions, readFile, writeFile } from 'jsonfile'
import { join } from 'path'
import { JsonValue, PackageJson, TsConfigJson } from 'type-fest'
import { parseJsoncString } from './parseJsonc'

// todo support uri
export const readJsonFile = <T>(path: string, options?: JFReadOptions): Promise<T> => readFile(path, options)

// TODO undefiend values, as always
export const writeJsonFile = <T extends JsonValue>(path: string, object: T, options?: JFWriteOptions): Promise<void> => writeFile(path, object, options)

export const readPackageJsonFile = (path: string | { dir: string }, options?: JFReadOptions): Promise<PackageJson> => {
    if (typeof path === 'object') path = join(path.dir, 'package.json')
    return readFile(path, options)
}

export const writePackageJsonFile = (path: string | { dir: string }, packageJson: PackageJson, options?: JFWriteOptions): Promise<void> => {
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
    },
): Promise<TsConfigJson> => {
    if (typeof path === 'object') path = join(path.dir, 'tsconfig.json')
    const jsonc = await fs.promises.readFile(path, 'utf-8')
    return parseJsoncString(jsonc, errorTolerant)
}

export const writeTsconfigJsonFile = (path: string | { dir: string }, tsconfigJson: TsConfigJson, options?: JFWriteOptions): Promise<void> => {
    if (typeof path === 'object') path = join(path.dir, 'tsconfig.json')
    return writeFile(path, tsconfigJson, options)
}
