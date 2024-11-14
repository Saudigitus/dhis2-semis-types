import { DataValuesProps } from "../../types/api/WithoutRegistrationTypes"
import { attributesProps } from "../../types/api/WithRegistrationTypes"
import { RowsDataProps } from "../../types/common/FormatRowsDataProps"

export function attributes(data: attributesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    for (const attribute of data) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}

export function dataValues(data: DataValuesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    for (const dataElement of data) {
        localData[dataElement.dataElement] = dataElement.value
    }
    return localData
}