import { useGetEnrollmentData } from "../enrollmentDetails/useGetEnrollmentDetails"
import { useGetEvents } from "../events/useGetEvents"
import { ExportData } from "../../types/bulk/bulkOperations"

export function getCommonSheetData(props: ExportData) {
    const { getEvents } = useGetEvents()
    const { orgUnit, eventFilters = [], seletecSectionDataStore } = props
    const { getEnrollmentDetails } = useGetEnrollmentData({ ...props })

    async function getData() {
        const events = await getEvents({
            program: seletecSectionDataStore?.program as unknown as string,
            programStage: seletecSectionDataStore?.registration.programStage,
            fields: "trackedEntity,enrollment,orgUnit,program",
            filter: eventFilters,
            orgUnit,
            skipPaging: false,
            pageSize: 5,
            page: 1,
            ouMode: 'SELECTED',
            order: seletecSectionDataStore?.defaults.defaultOrder
        })

        const enrollmentDetails = await getEnrollmentDetails(events)

        return enrollmentDetails
    }

    return { getData }
}