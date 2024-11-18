import { useGetProgramRules } from '../useGetProgramRules';
import { useGetOptionGroups } from '../../optionGroup/useGetOptionGroups';
import { useOrgUnitsGroups } from '../../orgUnitsGroup/useOrgUnitsGroups';
import { useGetProgramRulesVariables } from '../useGetProgramRulesVariables';

export default function FetchEngineVariables() {
    const { loadingPRules, errorPRules } = useGetProgramRules();
    const { loadingOptionGroups, errorOptionGroups } = useGetOptionGroups();
    const { loadingOrgUnitsGroups, errorOrgUnitsGroups } = useOrgUnitsGroups();
    const { loadingPRulesVariables, errorPRulesVariables } = useGetProgramRulesVariables();

    return {
        error: errorPRules || errorOptionGroups || errorOrgUnitsGroups || errorPRulesVariables,
        loading: loadingPRules || loadingPRulesVariables || loadingOptionGroups || loadingOrgUnitsGroups,
    }

}