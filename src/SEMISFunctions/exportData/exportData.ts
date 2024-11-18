import { ExportData, modules } from "../../types/bulk/bulkOperations";
import { getCommonSheetData } from "../../hooks/useGetCommonData/commonData";
import { useState } from 'react'
import { isDateFormatValid } from "../../utils/format/checkDateFormat";
import { useGetEvents } from "../../hooks/events/useGetEvents";
import { formatSheetData } from "../../utils/format/formatSheetData";
import { DataStoreRecord } from "../../types/dataStore/DataStoreConfig";

export function useExportData(props: ExportData) {
    const { orgUnit, stagesToExport, module, endDate, startDate, seletecSectionDataStore } = props
    const { getData } = getCommonSheetData(props)
    const [error, setError] = useState<any>(null)
    const { getEvents, error: eventsError } = useGetEvents()

    async function exportData() {
        if (module === modules.attendance && (!isDateFormatValid(endDate as unknown as string) || !isDateFormatValid(startDate as unknown as string))) {
            setError('The date format is not correct, the expected date format is: yyyy-MM-dd')
        } else {
            let data = await getData()

            if (module != modules.enrollment) {
                const teis = data?.map((x: any) => { return { trackedEntity: x.trackedEntity, enrollment: x.enrollment } })

                for (let teisCounter = 0; teisCounter < teis.length; teisCounter++) {
                    for (let a = 0; a < stagesToExport.length; a++) {
                        await getEvents({
                            program: seletecSectionDataStore?.program as unknown as string,
                            ...(module === modules.attendance ? {
                                occurredAfter: startDate,
                                occurredBefore: endDate
                            } : {}),
                            orgUnit,
                            ouMode: "SELECTED",
                            programStage: stagesToExport[a],
                            fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                            trackedEntity: teis[teisCounter].trackedEntity,
                        }).then((resp) => {
                            const dataValues = resp?.find((x: any) => x.enrollment === teis[teisCounter].enrollment)

                            data[teisCounter] = { ...data[teisCounter], ...formatSheetData({ module: module, stageId: stagesToExport[a], dataV: dataValues, dataStore: seletecSectionDataStore as unknown as DataStoreRecord }) }
                        }).catch((error) => {
                            setError(error)
                        })
                    }
                }
            }

            console.log(data)
        }
    }

    return { exportData, error: error || eventsError }
}