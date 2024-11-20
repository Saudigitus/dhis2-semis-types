import { FormattedPRulesType, PRulesTypes } from "../../types/programRules/FormattedPRules";
import { ProgramRuleConfig, ProgramRuleVariableConfig } from "../../types/programRules/ProgramRulesTypes";


export function formatProgramRules(programRules: ProgramRuleConfig[]): FormattedPRulesType[] {
    console.log(programRules)
    const programRulesResponses: FormattedPRulesType[] = [];
    for (const prules of programRules || []) {
        for (const pRulesAction of prules.programRuleActions) {
            programRulesResponses.push({
                condition: prules.condition,
                programRuleActionType: pRulesAction.programRuleActionType,
                variable: pRulesAction?.dataElement?.id || pRulesAction?.trackedEntityAttribute?.id || pRulesAction?.programStageSection?.id,
                type: pRulesAction?.dataElement?.id && PRulesTypes.DATA_ELEMENT || pRulesAction?.trackedEntityAttribute?.id && PRulesTypes.ATTRIBUTE || pRulesAction?.programStageSection?.id && PRulesTypes.SECTION,
                content: prules.content ?? pRulesAction?.content,
                programStage: prules?.programStage?.id,
                data: pRulesAction.data,
                optionGroup: pRulesAction?.optionGroup?.id,
                displayName: pRulesAction?.displayName,
                id: pRulesAction?.id,
                program: prules?.program?.id
            })
        }
    }

    return programRulesResponses;
}

export function formatProgramRuleVariables(programRuleVariables: ProgramRuleVariableConfig[]) {
    const programRuleVariablesResponses: Record<string, string | undefined> = {};

    for (const pRulesVariable of programRuleVariables || []) {
        programRuleVariablesResponses[pRulesVariable?.name.trim()] = pRulesVariable?.dataElement?.id || pRulesVariable?.trackedEntityAttribute?.id
    }

    return programRuleVariablesResponses;
}