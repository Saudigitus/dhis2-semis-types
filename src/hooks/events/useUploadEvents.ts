import { useDataMutation } from "@dhis2/app-runtime";
import { useState } from 'react'

const postEvent: any = {
    resource: 'tracker',
    type: 'create',
    data: ({ form }: any) => form,
    params: ({ params }: any) => params
}

const useUploadEvents = () => {
    const [stats, setStats] = useState<any>({ statsCount: {}, errorDetails: [] })
    const params = {
        async: false,
        atomicMode: "OBJECT",
        reportMode: "FULL"
    }

    function importSummary(summary: any) {
        setStats((prevStats: any) => ({
            ...prevStats,
            statsCount: {
                ignored: summary?.stats?.ignored ? summary?.stats?.ignored + prevStats.statsCount?.ignored : prevStats.statsCount?.ignored,
                created: summary?.stats?.created ? summary?.stats?.created + prevStats.statsCount?.created : prevStats.statsCount?.created,
                updated: summary?.stats?.updated ? summary?.stats?.updated + prevStats.statsCount?.updated : prevStats.statsCount?.updated,
                total: summary?.stats?.total ? summary?.stats?.total + prevStats.statsCount?.total : prevStats.statsCount?.total,
            }
        }))

        if (summary?.validationReport?.errorReports) {
            setStats((prevStats) => ({
                ...prevStats,
                errorDetails: [
                    ...prevStats.errorDetails,
                    ...summary?.validationReport?.errorReports
                ]
            }))
        }
    }

    const [mutate,] = useDataMutation(postEvent, {
        onComplete(data) {
            importSummary(data)
        },
    })

    async function uploadValues(data: any, importMode: string, importStrategy: string) {
        return await mutate({ form: { events: data }, params: { ...params, importStrategy, importMode } })
    }

    return { uploadValues, stats }
}

export default useUploadEvents
