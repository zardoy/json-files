/// <reference types="jest" />
import { join } from 'path'
import { readJsonFile } from '../src/'
import { parseJsoncString } from '../src/parseJsonc'

test('Parses jsonc', () => {
    expect(parseJsoncString('// comment\n{"d": /* */ 5,}//')).toEqual({ d: 5 })
})

test('Reads jsonc file if path ends with .jsonc', async () => {
    const result = await readJsonFile(join(__dirname, './tsconfig.fixture.jsonc'))
    expect(result).toMatchInlineSnapshot(`
Object {
  "compilerOptions": Object {
    "module": "commonjs",
    "noImplicitAny": true,
    "outDir": "dist",
    "preserveConstEnums": true,
    "removeComments": true,
    "sourceMap": true,
  },
  "files": Array [
    "./src/foo.ts",
  ],
}
`)
})

test("Throws on jsonc when file isn't jsonc", async () => {
    await expect(readJsonFile(join(__dirname, './tsconfig.fixture.jsonc'), { jsonc: false })).rejects.toMatchInlineSnapshot(
        `[SyntaxError: /Users/vitaly/Documents/typed-jsonfile/test/tsconfig.fixture.jsonc: Unexpected token / in JSON at position 0]`,
    )
})
