import { useRecoilValue } from "recoil";
import { ProgramRulesConfigState } from "../../schema/programRulesSchema";
import { FormattedPRulesType } from "../../types/programRules/FormattedPRules";
import { formatProgramRules } from "../../utils/programRules/formatProgramRules";

export function useFormatProgramRules() {
    const programRulesConfigState = useRecoilValue(ProgramRulesConfigState)

    return {
        programRules: formatProgramRules(programRulesConfigState),
    }
}
