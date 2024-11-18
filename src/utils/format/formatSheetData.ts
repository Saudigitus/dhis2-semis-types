import { ExportData, modules } from "../../types/bulk/bulkOperations"
import { DataStoreRecord } from "../../types/dataStore/DataStoreConfig"
import { attendanceFormater, dataValues } from "./formatData"

export function formatSheetData({ module, stageId, dataV, dataStore }: { module: ExportData['module'], stageId: string, dataV: any, dataStore: DataStoreRecord }) {
    let formatedValues = {}

    if (module == modules.attendance) {
        formatedValues = attendanceFormater(dataV, dataStore.attendance)
    } else {
        formatedValues = dataValues(dataV.dataValues, stageId)
    }

    return formatedValues
}