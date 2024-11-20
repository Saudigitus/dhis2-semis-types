import { GenerateHeaders, modules } from "../../../types/bulk/bulkOperations";
import { generateAttendanceDays } from "../../../utils/attendance/generateAttendanceDays";
import { dfHeaders } from "../../../utils/constants/dfHeaders";
import { getFilterLables } from "../../../utils/format/getFilterLables";

export function generateHeaders(props: GenerateHeaders) {
    const { module, programConfig, stagesToExport, sectionType, seletedSectionDataStore, withSocioEconomics, unavailableSchoolDays, endDate, startDate } = props
    const { getValidDaysToExport } = generateAttendanceDays({ unavailableDays: unavailableSchoolDays as unknown as (args: Date) => boolean })

    function getHeaders() {
        let formatedHeaders: any[] = []
        const stageHeaders = [seletedSectionDataStore.registration.programStage,
        ...((withSocioEconomics || module === modules.enrollment) ? [seletedSectionDataStore["socio-economics"].programStage] : []),
        ...(module != modules.enrollment ? stagesToExport : [])
        ]
        let filters = {}, ids: string[] = []

        const colors = {
            [seletedSectionDataStore.registration.programStage]: "FCE5CD",
            [seletedSectionDataStore["socio-economics"].programStage]: "79B473"
        }

        for (const stageId of stageHeaders) {
            const currStage = programConfig?.programStages?.find(x => x.id == stageId)

            if (stageId === seletedSectionDataStore.attendance.programStage) {
                let section: any = {
                    name: currStage?.displayName,
                    headers: [
                        ...getValidDaysToExport(new Date(startDate as unknown as string), new Date(endDate as unknown as string)).map((day) => {
                            return {
                                header: day.date,
                                key: day.date,
                                disabled: !day.schoolDay,
                                width: 25,
                            }
                        })
                    ]
                }

                const statusDe = currStage?.programStageDataElements.find(x => x.dataElement.id === seletedSectionDataStore.attendance.status)
                filters["Attendance"] = getFilterLables(statusDe?.dataElement.optionSet.options ?? [])

                formatedHeaders.push(section)
            } else {
                let schoolKey: any = []

                if (currStage?.id === seletedSectionDataStore.registration.programStage) {
                    schoolKey.push({
                        header: 'School',
                        key: 'school',
                        width: 25,
                    })
                }

                let section: any = {
                    name: currStage?.displayName,
                    headers: [...schoolKey],
                    fill: colors[(currStage as unknown as any)?.id]
                }

                currStage?.programStageDataElements.map((de) => {
                    if (de?.dataElement?.optionSet?.options?.length > 0) filters[de.dataElement.id] = getFilterLables(de.dataElement.optionSet.options)
                    section = {
                        ...section, headers: [...section.headers, {
                            header: de?.dataElement.displayName,
                            key: `${stageId}.${de?.dataElement?.id}`,
                            width: 25,
                        }]
                    }
                })

                formatedHeaders.push(section)
            }
        }

        const att = programConfig?.programTrackedEntityAttributes?.filter((att) => att.displayInList).map(x => {
            return {
                header: x.trackedEntityAttribute.displayName,
                key: x.trackedEntityAttribute?.id,
                width: 25,
            }
        })


        formatedHeaders.unshift({
            name: (sectionType ?? '').substring(0, 1).toUpperCase() + (sectionType ?? '').substring(1, (sectionType ?? '').length) + ' profile', headers: [{
                header: 'Ref',
                key: 'ref',
                width: 25,
            }, ...(att || [])], fill: 'D9EAD3'
        })

        formatedHeaders.push({
            name: "Ids",
            headers: dfHeaders
        })

        formatedHeaders.map(x => x?.headers?.map((header: any) => ids.push(header.key)))
        console.log(formatedHeaders, ids)
        return { formatedHeaders, filters, ids }
    }

    return { getHeaders }
}