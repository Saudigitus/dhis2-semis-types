import { useGetProgramRules } from '../useGetProgramRules';
import { useGetOptionGroups } from '../../optionGroup/useGetOptionGroups';
import { useOrgUnitsGroups } from '../../orgUnitsGroup/useOrgUnitsGroups';
import { useGetProgramRulesVariables } from '../useGetProgramRulesVariables';

export default function FetchEngineVariables(program: string) {
    const { loadingPRules, errorPRules } = useGetProgramRules(program);
    const { loadingOptionGroups, errorOptionGroups } = useGetOptionGroups();
    const { loadingOrgUnitsGroups, errorOrgUnitsGroups } = useOrgUnitsGroups();
    const { loadingPRulesVariables, errorPRulesVariables } = useGetProgramRulesVariables(program);

    return {
        error: errorPRules || errorOptionGroups || errorOrgUnitsGroups || errorPRulesVariables,
        loading: loadingPRules || loadingPRulesVariables || loadingOptionGroups || loadingOrgUnitsGroups,
    }

}