import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { ProgramRulesConfigState } from "../../schema/programRulesSchema";
import { ProgramRuleConfig } from "../../types/programRules/ProgramRulesTypes";

const PROGRAM_RULES_QUERY = {
    results: {
        resource: "programRules",
        params: {
            paging: false,
            // filter: ({ program }: any) => `program.id:eq:${program}`,
            fields: "id,displayName,condition,description,program[id],programStage[id],priority,programRuleActions[id,content,location,data,programRuleActionType,programStageSection[id],dataElement[id],trackedEntityAttribute[id],option[id],optionGroup[id],programIndicator[id],programStage[id]]",

        }
    }
}

type ProgramRulesQueryResponse = {
    results: {
        programRules: ProgramRuleConfig[]
    }
}
// program.id:eq
export function useGetProgramRules() {
    const { hide, show } = useShowAlerts()
    const [error, setError] = useState<boolean>(false)
    const [, setProgramRulesConfigState] = useRecoilState(ProgramRulesConfigState);

    const { data, loading: loadingPRules, refetch } = useDataQuery<ProgramRulesQueryResponse>(PROGRAM_RULES_QUERY, {
        onError(error: { message: string }) {
            show({
                message: `${("Could not get program rules")}: ${error?.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            setError(true)
        },
        onComplete(response: { results: { programRules: any[] } }) {
            setProgramRulesConfigState(response?.results?.programRules);
        },
        lazy: true
    })

    useEffect(() => {
        void refetch()
    }, [])

    return { loadingPRules, refetch, errorPRules: error }
}
