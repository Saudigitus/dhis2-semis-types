import { useRecoilState } from "recoil"
import { useFormatProgramRules } from "../hooks/useFormatProgramRules"
import { ProgramRulesFormatedState } from "../../../schema/programRulesFormated"
import { FormattedPRulesType } from "../../../types/programRules/FormattedPRules"
import { useFormatProgramRulesVariables } from "../hooks/useFormatProgramRulesVariables"
import { getFunctionExpression, getValueTypeVariable, removeSpecialCharacters, replaceConditionVariables } from "./RulesEngine"

export const initializeRulesEngine = () => {
    const { programRules } = useFormatProgramRules()
    const { programRulesVariables } = useFormatProgramRulesVariables()
    const [newProgramRules, setnewProgramRules] = useRecoilState(ProgramRulesFormatedState)

    function initialize() {
        if (programRules?.length > 0 && Object.keys(programRulesVariables)?.length > 0 && newProgramRules?.length === 0) {
            const newProgramRule: FormattedPRulesType[] = programRules
                .map((programRule: FormattedPRulesType) => {
                    return {
                        ...programRule,
                        functionName: getFunctionExpression(programRule.condition),
                        condition: replaceConditionVariables(removeSpecialCharacters(programRule?.condition), programRulesVariables),
                        data: replaceConditionVariables(removeSpecialCharacters(programRule?.data), programRulesVariables),
                    }
                })
            setnewProgramRules(newProgramRule)
        }
    }

    return { initialize }

}