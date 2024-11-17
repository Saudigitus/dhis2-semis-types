import { ExportData, modules } from "../../types/bulk/bulkOperations";
import { getCommonSheetData } from "../../hooks/useGetCommonData/commonData";
import { useState } from 'react'
import { isDateFormatValid } from "../../utils/format/checkDateFormat";
import { useGetEvents } from "../../hooks/events/useGetEvents";

export function useExportData(props: ExportData) {
    const { fileName, orgUnit, program, programStageIdToExport, eventFilters, sectionType, module, endDate, startDate } = props
    const { getData } = getCommonSheetData(props)
    const [error, setError] = useState<any>(null)
    const { getEvents } = useGetEvents()

    async function exportData() {
        if (module === modules.attendance && (!isDateFormatValid(endDate as unknown as string) || !isDateFormatValid(startDate as unknown as string))) {
            setError('The date format is not correct, the expected date format is: yyyy-MM-dd')
        } else {
            const data = await getData()

            if (programStageIdToExport) {
                const teis = data?.map((x: any) => { return { teiId: x.studentId, enrollment: x.enrollment } })
                console.log(teis)
                
                for (const tei of teis) {
                    await getEvents({
                        program,
                        ...(startDate ? { occurredAfter: startDate } : {}),
                        ...(endDate ? { occurredBefore: endDate } : {}),
                        orgUnit,
                        filter: eventFilters,
                        ouMode: "SELECTED",
                        programStage: programStageIdToExport,
                        order: "occurredAt:desc",
                        fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                        trackedEntity: tei.teiId,
                    }).then((resp) => {
                        const event = resp?.find((x: any) => x.enrollment === tei.enrollment)
                        console.log(event, 'kekek')
                    })
                }
            }
        }
    }

    return { exportData, error }
}