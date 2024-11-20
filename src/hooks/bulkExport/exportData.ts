import { useState } from 'react'
import { ExportData, modules } from "../../types/bulk/bulkOperations";
import { isDateFormatValid } from "../../utils/format/checkDateFormat";
import { useGetEvents } from "../events/useGetEvents";
import { formatSheetData } from "../../utils/format/formatSheetData";
import { DataStoreRecord } from "../../types/dataStore/DataStoreConfig";
import { getMetaData } from '../../utils/excelMetadata/getMetadata';
import { generateHeaders } from './excelHeaders/generateExcelHeaders';
import { getCommonSheetData } from './useGetCommonData/commonData';
import { gererateFile } from './dataExporter/fileGenerator';

export function useExportData(props: ExportData) {
    const [error, setError] = useState<any>(null)
    const { getData } = getCommonSheetData(props)
    const { getEvents, error: eventsError } = useGetEvents()
    const { programConfig, fileName, unavailableSchoolDays, orgUnit, stagesToExport, module, endDate, startDate, seletedSectionDataStore = {} as unknown as DataStoreRecord, withSocioEconomics = false, sectionType } = props
    const { excelGenerator } = gererateFile({ unavailableDays: unavailableSchoolDays as unknown as (date: Date) => boolean })
    const { getHeaders } = generateHeaders({ module, programConfig, stagesToExport, seletedSectionDataStore, sectionType, withSocioEconomics, endDate, startDate })

    async function exportData() {

        if (module === modules.attendance &&
            (!isDateFormatValid(endDate as unknown as string)
                || !isDateFormatValid(startDate as unknown as string))
        ) {
            setError('The date format is not correct, the expected date format is: yyyy-MM-dd')
        } else {

            const { filters, formatedHeaders, ids } = getHeaders()
            const metadata = getMetaData(programConfig, stagesToExport)

            let data = await getData()

            if (module != modules.enrollment) {

                for (let teisCounter = 0; teisCounter < data.length; teisCounter++) {
                    for (let a = 0; a < stagesToExport.length; a++) {

                        await getEvents({
                            program: seletedSectionDataStore?.program as unknown as string,
                            ...(module === modules.attendance ? {
                                occurredAfter: startDate,
                                occurredBefore: endDate
                            } : {}),
                            orgUnit,
                            ouMode: "SELECTED",
                            programStage: stagesToExport[a],
                            fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                            trackedEntity: data[teisCounter].trackedEntity,
                        }).then((resp) => {

                            const dataValues = resp?.find((x: any) => x.enrollment === data[teisCounter].enrollment)

                            data[teisCounter] = {
                                ...data[teisCounter], ...formatSheetData({
                                    module: module,
                                    stageId: stagesToExport[a],
                                    dataV: dataValues,
                                    dataStore: seletedSectionDataStore as unknown as DataStoreRecord
                                })
                            }
                        }).catch((error) => {
                            setError(error)
                        })
                    }
                }
            }

            await excelGenerator({ headers: formatedHeaders, rows: data, filters, fileName, metadata, module, ids })
        }
    }

    return { exportData, error: error || eventsError }
}