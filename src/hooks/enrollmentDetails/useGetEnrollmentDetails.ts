import { useState } from 'react'
import { useGetTei } from '../tei/useGetTei';
import { useGetEvents } from '../events/useGetEvents';
import { ExportData, modules } from '../../types/bulk/bulkOperations';
import { attributes, dataValues } from '../../utils/format/formatData';

export function useGetEnrollmentData(props: ExportData) {
    const { getTei } = useGetTei()
    const { getEvents } = useGetEvents()
    const [error, setError] = useState<boolean>(false)
    const { orgUnitName, orgUnit, eventFilters, withSocioEconomics, seletecSectionDataStore, module } = props

    const getEnrollmentDetails = async (events: any) => {
        const trackedEntityIds = events?.map((x: { trackedEntity: string }) => x.trackedEntity).join(';')

        try {
            return getTei(seletecSectionDataStore?.program as unknown as string, trackedEntityIds)
                .then(async (trackedEntityInstance: any) => {
                    let rows: any = []
                    let counter = 0

                    for (const tei of trackedEntityInstance?.results?.instances) {
                        counter++
                        let enrollment = events.find((x: any) => x.trackedEntity == tei?.trackedEntity)?.enrollment
                        let socioEconomiscData: any = []

                        const registrationData: any = await getEvents({
                            program: seletecSectionDataStore?.program as unknown as string,
                            programStage: seletecSectionDataStore?.registration.programStage as unknown as string,
                            ouMode: "SELECTED",
                            fields: "*",
                            filter: eventFilters,
                            skipPaging: true,
                            trackedEntity: tei.trackedEntity,
                            orgUnit: orgUnit
                        })

                        if (withSocioEconomics || module === modules.enrollment) {
                            socioEconomiscData = await getEvents({
                                program: seletecSectionDataStore?.program as unknown as string,
                                programStage: seletecSectionDataStore?.['socio-economics'].programStage as unknown as string,
                                ouMode: "SELECTED",
                                fields: "*",
                                filter: eventFilters,
                                skipPaging: true,
                                trackedEntity: tei.trackedEntity,
                                orgUnit: orgUnit
                            })
                        }


                        const currEnrollmentRegistration = registrationData?.find((x: any) => x.enrollment === enrollment)
                        const currEnrollmentSocioEconomics = socioEconomiscData?.find((x: any) => x.enrollment === enrollment)

                        rows = [...rows, {
                            ref: "" + counter + " ",
                            school: orgUnitName,
                            orgUnit: currEnrollmentRegistration?.orgUnit,
                            enrollmentDate: currEnrollmentRegistration?.occurredAt,
                            enrollment: enrollment,
                            trackedEntity: tei.trackedEntity,
                            ...attributes(tei?.attributes ?? []),
                            ...dataValues(currEnrollmentRegistration?.dataValues ?? []),
                            ...dataValues(currEnrollmentSocioEconomics?.dataValues ?? []),
                        }]
                    }

                    return rows
                })
        }
        catch (error: any) {
            setError(error)
        }

    }

    return { getEnrollmentDetails, error }
}