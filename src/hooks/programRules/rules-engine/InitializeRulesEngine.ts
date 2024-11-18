import { useRecoilState } from "recoil"
import { useFormatProgramRules } from "../useFormatProgramRules"
import { ProgramRulesFormatedState } from "../../../schema/programRulesFormated"
import { CustomAttributeProps } from "../../../types/variables/AttributeColumns"
import { FormattedPRulesType } from "../../../types/programRules/FormattedPRules"
import { useFormatProgramRulesVariables } from "../useFormatProgramRulesVariables"
import { getFunctionExpression, getValueTypeVariable, removeSpecialCharacters, replaceConditionVariables } from "./RulesEngine"

export const initializeRulesEngine = (program: string) => {
    const { programRules } = useFormatProgramRules(program)
    const { programRulesVariables } = useFormatProgramRulesVariables(program)
    const [newProgramRules, setnewProgramRules] = useRecoilState(ProgramRulesFormatedState)

    function initialize(columns: CustomAttributeProps[]) {
        if (programRules?.length > 0 && Object.keys(programRulesVariables)?.length > 0 && newProgramRules?.length === 0) {
            const newProgramRule: FormattedPRulesType[] = programRules
                .map((programRule: FormattedPRulesType) => {
                    return {
                        ...programRule,
                        functionName: getFunctionExpression(programRule.condition),
                        condition: replaceConditionVariables(removeSpecialCharacters(programRule?.condition), programRulesVariables),
                        data: replaceConditionVariables(removeSpecialCharacters(programRule?.data), programRulesVariables),
                        valueType: getValueTypeVariable(columns, programRule)
                    }
                })
            setnewProgramRules(newProgramRule)
        }
    }

    return { initialize }

}