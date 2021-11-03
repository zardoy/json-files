import { parse as jsoncParser, printParseErrorCode, ParseError } from 'jsonc-parser'

export const parseJsoncString = (jsoncString: string, errorTolerant = false) => {
    const errors: ParseError[] = []
    const json = jsoncParser(jsoncString, errors, { allowTrailingComma: true })
    // TODO better error printing
    if (errors.length && !errorTolerant) throw errors.map(({ error, ...rest }) => ({ code: printParseErrorCode(error), ...rest }))
    return json
}
