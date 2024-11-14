import { GenerateHeaders } from "../../types/bulk/bulkOperations";
import { ProgramConfig } from "../../types/programConfig/ProgramConfig";

export const dfHeaders = [
    {
        "header": "Enrollment",
        "key": "enrollment",
        "width": 25
    },
    {
        "header": "Tracked Entity Id",
        "key": "studentId",
        "width": 25
    },
    {
        "header": "School UID",
        "key": "orgUnit",
        "width": 25
    }
]

export function generateHeaders(props: GenerateHeaders) {
    const { programConfig, programStageIdToExport, registration, sectionType, socioEconomicsId, withSocioEconomics } = props

    function getHeaders() {
        let formatedHeaders: any[] = []
        const colors = { [registration]: "FCE5CD", [socioEconomicsId]: "79B473" }

        programConfig.programStages.filter(x => {
            if (x.id == registration || (withSocioEconomics && x.id === socioEconomicsId)) {

                let section: any = {
                    name: x.displayName,
                    headers: [
                        ...(x.id === registration ? [{
                            header: 'School',
                            key: 'school',
                            width: 25,
                        }] : [])
                    ],
                    fill: colors[x.id]
                }

                x.programStageDataElements.map((de) => {
                    section = {
                        ...section, headers: [...section.headers, {
                            header: de?.dataElement.displayName,
                            key: de?.dataElement.id,
                            width: 25,
                        }]
                    }
                })

                formatedHeaders.push(section)
            }
        })

        const att = programConfig.programTrackedEntityAttributes.filter((att) => att.displayInList).map(x => {
            return {
                header: x.trackedEntityAttribute.displayName,
                key: x.trackedEntityAttribute.id,
                width: 25,
            }
        })

        formatedHeaders.unshift({
            name: (sectionType ?? '').substring(0, 1).toUpperCase() + (sectionType ?? '').substring(1, (sectionType ?? '').length) + ' profile', headers: [{
                header: 'Ref',
                key: 'ref',
                width: 25,
            }, ...att], fill: 'D9EAD3'
        })

        return formatedHeaders
    }

    function getAllowedMajorHeaders() {

        return [
            (sectionType ?? '').substring(0, 1).toUpperCase() + (sectionType ?? '').substring(1, (sectionType ?? '').length) + ' profile',
            programConfig.programStages.find(x => x.id == registration)?.displayName,
            'Attendance', 'Ids'
        ]
    }

    return { getHeaders, getAllowedMajorHeaders }
}