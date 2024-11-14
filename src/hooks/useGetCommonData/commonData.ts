import { useGetEnrollmentData } from "../enrollmentDetails/useGetEnrollmentDetails"
import { useGetEvents } from "../events/useGetEvents"
import { ExportData } from "../../types/bulk/bulkOperations"

export function getCommonSheetData(props: ExportData) {
    const { getEvents } = useGetEvents()
    const { orgUnit, program, programStageIdToExport, eventFilters = [] } = props
    const { getEnrollmentDetails } = useGetEnrollmentData({ ...props })

    async function getData() {
        const events = await getEvents({
            program,
            programStage: programStageIdToExport,
            fields: "trackedEntity,enrollment,orgUnit,program",
            filter: eventFilters,
            orgUnit,
            paging: false,
            ouMode: 'SELECTED'
        })

        const enrollmentDetails = await getEnrollmentDetails(events)

        return enrollmentDetails
    }

    return { getData }
}