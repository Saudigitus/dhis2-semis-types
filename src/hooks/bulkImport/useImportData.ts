import { importData, importProps } from "../../types/bulk/bulkOperations";
import { modules } from "../../types/common/moduleTypes";
import { DataStoreRecord } from "../../types/dataStore/DataStoreConfig";
import { generateAttendanceEventObjects, generateEnrollmentData, generateEventObjects } from "./createEvents/createEventsObject";
import { postAttendanceValues } from "./postEvents/postAttendance";
import { postEnrollmentData } from "./postEvents/postEnrollment";
import { postValues } from "./postEvents/postEvents";

export function useImportData(props: importProps) {
    const { programConfig, seletedSectionDataStore, sectionType = 'student', orgUnit } = props
    const { postData, stats } = postValues()
    const { postAttendance, attendanceStats } = postAttendanceValues()
    const { postEnrollments, enrollmentStats } = postEnrollmentData()

    async function importProps(props: importData) {
        const { excelData, importMode, updating = true } = props
        const studentsData = excelData.mapping
        const profile = sectionType.substring(0, 1).toUpperCase() + sectionType.substring(1, sectionType.length) + ' profile'
        const programStages = [
            ...(
                excelData.module != modules.enrollment ?
                    seletedSectionDataStore?.[excelData.module as unknown as any].programStage ?
                        [seletedSectionDataStore?.[excelData.module as unknown as any].programStage] :
                        seletedSectionDataStore?.[excelData.module as unknown as any].programStages.map((x: any) => x.programStage)
                    : []
            )
        ]

        const displayNames = programConfig.programStages.filter(x => programStages.includes(x.id)).map(x => x.displayName)

        switch (excelData.module) {
            case modules.attendance:
                const { attendanceEvents } = generateAttendanceEventObjects(displayNames, studentsData, seletedSectionDataStore as unknown as DataStoreRecord)
                const attendanceDisplayName = programConfig.programStages.find(x => x.id === seletedSectionDataStore?.attendance.programStage)?.displayName

                await postAttendance(
                    attendanceEvents,
                    attendanceDisplayName as unknown as string,
                    seletedSectionDataStore?.attendance.programStage as unknown as string,
                    excelData.mapping,
                    programConfig.id,
                    importMode
                )
                break;

            case modules.enrollment:
                const stagesToIgnore = [
                    seletedSectionDataStore?.attendance.programStage as unknown as string,
                    seletedSectionDataStore?.transfer.programStage as unknown as string,
                    ...(updating ? [
                        seletedSectionDataStore?.["final-result"].programStage as unknown as string,
                        seletedSectionDataStore?.registration.programStage as unknown as string,
                        ...(seletedSectionDataStore?.performance.programStages.map(x => x.programStage)) as unknown as string
                    ] : [""])
                ]

                const { enrollments } = generateEnrollmentData(
                    profile,
                    programConfig,
                    stagesToIgnore,
                    studentsData,
                    orgUnit as unknown as string,
                    updating,
                )

                await postEnrollments(
                    enrollments,
                    studentsData,
                    importMode,
                    programConfig.id,
                    updating,
                    seletedSectionDataStore as unknown as DataStoreRecord
                )
                break

            default:
                const { events } = generateEventObjects(displayNames, studentsData, programConfig)

                await postData(events, excelData, importMode, programConfig, programStages)
                break;
        }
    }

    return { importProps, stats }
}