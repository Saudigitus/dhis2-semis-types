export const DataElementFieldType = {
    programStage: "executionDateLabel,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]],programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
    programStageSection: "executionDateLabel,programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
}

interface GetDataElementsProps {
    programStageId: string
    type?: keyof typeof DataElementFieldType
}

interface attributesProps {
    attribute: string
    value: string
}
interface dataValuesProps {
    dataElement: string
    value: string
}

export type { GetDataElementsProps, dataValuesProps, attributesProps }
