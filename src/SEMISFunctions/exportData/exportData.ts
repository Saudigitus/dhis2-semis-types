import { ExportData } from "../../types/bulk/bulkOperations";
import { getCommonSheetData } from "./commonData";

export function useExportData(props: ExportData) {
    const { fileName, orgUnit, program, programStageIdToExport, eventFilters } = props
    const { getData } = getCommonSheetData(props)


    async function exportData() {
        await getData()

    }

    return { exportData }
}