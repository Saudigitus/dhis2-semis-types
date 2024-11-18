import { useRecoilValue } from "recoil";
import { ProgramRulesConfigState } from "../../schema/programRulesSchema";
import { FormattedPRulesType } from "../../types/programRules/FormattedPRules";
import { formatProgramRules } from "../../utils/programRules/formatProgramRules";

export function useFormatProgramRules(programId: string) {
    const programRulesConfigState = useRecoilValue(ProgramRulesConfigState)

    return {
        programRules: formatProgramRules(programRulesConfigState).filter((programRule: FormattedPRulesType) => programRule.program === programId),
    }
}
