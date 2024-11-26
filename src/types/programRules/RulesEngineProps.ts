import { CustomAttributeProps } from "../variables/AttributeColumns"


export enum RulesType {
    ProgramStage = "ProgramStage",
    AttributesSection = "AttributesSection",
    ProgramStageSection = "ProgramStageSection",
}

interface RulesEngineProps {
    type: RulesType
    programStage?: string
    values: Record<string, any>
    variables: SectionVariablesProps[] | CustomAttributeProps[]
}

interface SectionVariablesProps {
    section: string
    visible: boolean
    description: string
    fields: CustomAttributeProps[]
}

interface RulesEngineWrapperProps {
    programs: string[],
    children: React.ReactNode,
}

export type { RulesEngineProps, SectionVariablesProps, RulesEngineWrapperProps }