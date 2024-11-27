
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { EventQueryProps, EventQueryResults } from "../../types/events/eventsProps";
import { TeiQueryProps, TeiQueryResults } from "../../types/tei/teiProps";
import { GetTableDataProps, TableDataProps } from "../../types/table/tableDataProps";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: queryProps?.fields ?? "*",
            ...queryProps
        }
    }
})

const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program,status],programOwners[orgUnit]",
            ...queryProps
        }
    }
})


export function useTableData() {
    const engine = useDataEngine();
   // const { program, registration } = getDataStoreKeys()
    //const headerFieldsState = useRecoilValue(HeaderFieldsState)
    //const setEvents = useSetRecoilState(EventsState)
    //const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])
    //const { hide, show } = useShowAlerts()
    //const { getDataStoreData } = getSelectedKey()
    //const school = urlParamiters().school as unknown as string

    async function getData( tableDataProps: GetTableDataProps) {
        const { page, pageSize, order, program, orgUnit, baseProgramStage, secondaryProgramStages, attributeFilters, dataElementFilters, showAlert, hideAlert } = tableDataProps;
        if (orgUnit !== null) {
            setLoading(true)

            const eventsResults = await engine.query(EVENT_QUERY({
                ouMode: orgUnit != null ? "SELECTED" : "ACCESSIBLE",
                page,
                pageSize,
                program: program as unknown as string,
                order: order || "occurredAt:desc",
                programStage: baseProgramStage,
                filter: dataElementFilters,
                filterAttributes: attributeFilters,
                orgUnit: orgUnit
            })).catch((error) => {
                showAlert({
                    message: `${("Could not get events")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hideAlert, 5000);
            }) as unknown as EventQueryResults;

            const trackedEntityToFetch = eventsResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

            const teiResults = trackedEntityToFetch?.length > 0
                ? await engine.query(TEI_QUERY({
                    ouMode: orgUnit != null ? "SELECTED" : "ACCESSIBLE",
                    pageSize,
                    program: program as unknown as string,
                    trackedEntity: trackedEntityToFetch
                })).catch((error) => {
                    showAlert({
                        message: `${("Could not get traked entities")}: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hideAlert, 5000);
                }) as unknown as TeiQueryResults
                : { results: { instances: [] } } as unknown as TeiQueryResults

            //setEvents(eventsResults?.results?.instances)
            console.log('eventsInstances:', eventsResults?.results?.instances)
            console.log('teiInstances:', teiResults?.results?.instances)
            /* setTableData(formatResponseRows({
                eventsInstances: eventsResults?.results?.instances as unknown as FormatResponseRowsProps['eventsInstances'],
                teiInstances: teiResults?.results?.instances as unknown as FormatResponseRowsProps['teiInstances']
            })); */

            setLoading(false)
        }
    }

    return {
        getData,
        tableData,
        loading
    }
}
