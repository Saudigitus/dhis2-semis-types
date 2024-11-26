import { type EventQueryProps } from "../../types/api/WithoutRegistrationTypes";
import { useDataEngine } from "@dhis2/app-runtime";
import { useState } from 'react'

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            ...queryProps
        }
    }
})
export function useGetEvents() {
    const engine = useDataEngine();
    const [error, setError] = useState<any>(null)

    async function getEvents(props: EventQueryProps): Promise<any> {

        return await engine.query(EVENT_QUERY(
            { ...props }
        )).then((resp: any) => {
            return resp.results?.instances
        }).catch((resp: any) => {
            setError(resp)
        })
    }

    return { getEvents, error }
}
