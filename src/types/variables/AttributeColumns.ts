import { type Attribute } from '../generated/models';

export enum VariablesTypes {
    DataElement = "dataElement",
    Attribute = "attribute",
    Custom = "custom",
    Default = "default",
}

export interface CustomAttributeProps {
    id: string
    rawId?:string
    displayName: string
    header: string
    required: boolean
    name: string
    programStage?: string
    assignedValue?: string
    value?: string
    labelName: string
    valueType: typeof Attribute.valueType
    disabled: boolean
    visible: boolean
    options: {
        optionSet: {
            id: string
            options: OptionsProps[]
        }
    }
    pattern?: string
    searchable?: boolean
    error?: boolean
    warning?:boolean
    content?: string
    key?: any
    description?: string
    displayInFilters?: boolean
    type: VariablesTypes
    trackedEntity?: string
    placeholder?: string
    unique?: boolean
    initialOptions: {
        optionSet: {
            id: string
            options: OptionsProps[]
        }
    }
    pattern?: string
    warning?: boolean
    searchable?: boolean
    error?: boolean
    content?: string
    key?: any
    description?: string
    type: VariablesTypes
}

export interface OptionsProps {
    value: string
    label: string
}

