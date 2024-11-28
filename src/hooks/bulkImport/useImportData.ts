import { importData } from "../../types/bulk/bulkOperations";
import { modules } from "../../types/common/moduleTypes";
import { generateAttendanceEventObjects, generateEnrollmentData, generateEventObjects } from "./createEvents/createEventsObject";

export function useImportData(props: importData) {
    const { programConfig, seletedSectionDataStore, updating = false, sectionType = 'student', orgUnit } = props

    function importData(excelData: { module: "attendance" | "final-result" | "enrollment" | "performance", mapping: [] }) {
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
                break;

            case modules.enrollment:
                const { enrollments } = generateEnrollmentData(profile, programConfig,
                    [
                        seletedSectionDataStore?.attendance.programStage as unknown as string,
                        seletedSectionDataStore?.transfer.programStage as unknown as string
                    ], studentsData, orgUnit as unknown as string)
                break

            default:
                const { events } = generateEventObjects(displayNames, studentsData, programConfig.id)
                break;
        }
    }

    return { importData }
}