import { SectionVariablesProps } from "../../types/programRules/RulesEngineProps"

export function formatKeyValueType(variables: SectionVariablesProps[] | SectionVariablesProps['fields']): Record<string, string> {
    const keys: Record<string, any> = {}

    if (Object.keys(variables[0]).includes("fields")) {
        for (const iterator of variables as SectionVariablesProps[]) {
            if (iterator?.fields) {
                for (const variable of iterator?.fields) {
                    keys[variable.name] = variable.valueType
                }
            }
        }
    }

    else {
        for (const variable of variables as SectionVariablesProps['fields']) {
            keys[variable.id] = variable.valueType
        }
    }


    return keys
}
