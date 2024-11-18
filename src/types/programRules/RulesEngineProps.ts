import { CustomAttributeProps } from "../variables/AttributeColumns"

type RulesType = "programStage" | "programStageSection" | "attributesSection"

interface RulesEngineProps {
    variables: any[]
    programStage?: string
    formatKeyValueType?: any,
    values: Record<string, any>
    type: RulesType
}

interface RulesEngineWrapperProps {
    program: string,
    children: React.ReactNode,
    columns: CustomAttributeProps[],
}

export type { RulesType, RulesEngineProps, RulesEngineWrapperProps }