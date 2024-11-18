import { GenerateHeaders } from "../../types/bulk/bulkOperations";
import { generateAttendanceDays } from "../../utils/attendance/generateAttendanceDays";

export const dfHeaders = [
    {
        "header": "Enrollment",
        "key": "enrollment",
        "width": 25
    },
    {
        "header": "Tracked Entity Id",
        "key": "trackedEntity",
        "width": 25
    },
    {
        "header": "School UID",
        "key": "orgUnit",
        "width": 25
    }
]

export function generateHeaders(props: GenerateHeaders) {
    const { programConfig, stagesToExport, sectionType, seletecSectionDataStore, withSocioEconomics, unavailableSchoolDays, endDate, startDate } = props
    const { getValidDaysToExport } = generateAttendanceDays({ unavailableDays: unavailableSchoolDays as unknown as (args: Date) => boolean })

    function getHeaders() {
        let formatedHeaders: any[] = []
        const stageHeaders = [seletecSectionDataStore.registration.programStage, ...(withSocioEconomics ? [seletecSectionDataStore["socio-economics"].programStage] : []), ...stagesToExport]
        const colors = {
            [seletecSectionDataStore.registration.programStage]: "FCE5CD",
            [seletecSectionDataStore["socio-economics"].programStage]: "79B473"
        }

        for (const stageId of stageHeaders) {
            const currStage = programConfig?.programStages?.find(x => x.id == stageId)

            if (stageId === seletecSectionDataStore.attendance.programStage) {
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

                formatedHeaders.push(section)
            } else {

                let section: any = {
                    name: currStage?.displayName,
                    headers: [
                        ...(currStage?.id === seletecSectionDataStore.registration.programStage ? [{
                            header: 'School',
                            key: 'school',
                            width: 25,
                        }] : [])
                    ],
                    fill: colors[(currStage as unknown as any)?.id]
                }

                currStage?.programStageDataElements.map((de) => {
                    section = {
                        ...section, headers: [...section.headers, {
                            header: de?.dataElement.displayName,
                            key: `${de?.dataElement?.id}_${stageId}`,
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

        return formatedHeaders
    }

    function getAllowedMajorHeaders() {

        return [
            (sectionType ?? '').substring(0, 1).toUpperCase() + (sectionType ?? '').substring(1, (sectionType ?? '').length) + ' profile',
            programConfig.programStages.find(x => x.id == seletecSectionDataStore.registration.programStage)?.displayName,
            'Attendance', 'Ids'
        ]
    }

    return { getHeaders, getAllowedMajorHeaders }
}