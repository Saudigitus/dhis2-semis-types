import { ExportData } from "../../types/bulk/bulkOperations";
import { getCommonSheetData } from "../../hooks/useGetCommonData/commonData";

export function useExportData(props: ExportData) {
    const { fileName, orgUnit, program, programStageIdToExport = 'enrollment', eventFilters } = props
    const { getData } = getCommonSheetData(props)


    async function exportData() {
        const data = await getData()



    }

    return { exportData }
}