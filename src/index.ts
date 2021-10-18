import { JFReadOptions, JFWriteOptions, readFile, writeFile } from 'jsonfile'
import { join } from 'path'
import { JsonValue, PackageJson } from 'type-fest'

// todo support uri
export const readJsonFile = <T>(path: string, options?: JFReadOptions): Promise<T> => readFile(path, options)

// TODO undefiend values, as always
export const writeJsonFile = <T extends JsonValue>(path: string, object: T, options?: JFWriteOptions): Promise<void> => writeFile(path, object, options)

export const readPackageJsonFile = (path: string | { dir: string }, options?: JFReadOptions): Promise<PackageJson> => {
    if (typeof path === 'object') path = join(path.dir, 'package.json')
    return readFile(path, options)
}

export const writePackageJsonFile = (path: string | { dir: string }, object: PackageJson, options?: JFWriteOptions): Promise<void> => {
    if (typeof path === 'object') path = join(path.dir, 'package.json')
    return writeFile(path, object, options)
}
