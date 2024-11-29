import { importData } from "../../types/bulk/bulkOperations";
import { modules } from "../../types/common/moduleTypes";
import { generateAttendanceEventObjects, generateEnrollmentData, generateEventObjects } from "./createEvents/createEventsObject";
import { postValues } from "./postEvents/postEvents";

export function useImportData(props: importData) {
    const { programConfig, seletedSectionDataStore, updating = false, sectionType = 'student', orgUnit } = props
    const { postData, stats, postAttendanceData } = postValues()

    async function importData(excelData: { module: "attendance" | "final-result" | "enrollment" | "performance", mapping: [] }) {
        const studentsData = excelData.mapping
        const profile = sectionType.substring(0, 1).toUpperCase() + sectionType.substring(1, sectionType.length) + ' profile'
        const progrmStages = [
            ...(
                excelData.module != modules.enrollment ?
                    seletedSectionDataStore?.[excelData.module as unknown as any].programStage ?
                        [seletedSectionDataStore?.[excelData.module as unknown as any].programStage] :
                        seletedSectionDataStore?.[excelData.module as unknown as any].programStages.map((x: any) => x.programStage)
                    : []
            )
        ]

        const displayNames = programConfig.programStages.filter(x => progrmStages.includes(x.id)).map(x => x.displayName)

        switch (excelData.module) {
            case modules.attendance:
                const { attendanceEvents } = generateAttendanceEventObjects(displayNames, studentsData, programConfig.id, seletedSectionDataStore?.attendance.status as unknown as string)
                const attendanceDisplayName = programConfig.programStages.find(x => x.id === seletedSectionDataStore?.attendance.programStage)?.displayName

                await postAttendanceData(
                    attendanceEvents,
                    attendanceDisplayName as unknown as string,
                    seletedSectionDataStore?.attendance.programStage as unknown as string,
                    excelData.mapping,
                    programConfig.id
                )
                break;

            case modules.enrollment:
                const { enrollments } = generateEnrollmentData(profile, programConfig,
                    [
                        seletedSectionDataStore?.attendance.programStage as unknown as string,
                        seletedSectionDataStore?.transfer.programStage as unknown as string
                    ], studentsData, orgUnit as unknown as string)

                await postData(enrollments, excelData.module, orgUnit as unknown as string)
                break

            default:
                const { events } = generateEventObjects(displayNames, studentsData, programConfig.id)

                await postData(events, excelData.module, orgUnit as unknown as string, excelData.mapping,)
                break;
        }
    }

    return { importData }
}