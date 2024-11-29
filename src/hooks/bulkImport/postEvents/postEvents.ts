import { format } from "date-fns";
import { modules } from "../../../types/common/moduleTypes";
import { useGetEvents } from "../../events/useGetEvents";
import useUploadEvents from "../../events/useUploadEvents";

export function postValues() {
    const { stats, uploadValues } = useUploadEvents()
    const { getEvents, error: eventsError } = useGetEvents()

    async function postAttendanceData(events: any[], programStageName: string, programStageId: string, excelData: any[], program: string) {
        let newEvents: any = [], updateEvents: any = []

        for (const student of excelData as unknown as []) {

            const { enrollment, orgUnit, trackedEntity } = (student as unknown as any).Ids
            const days = Object.keys(student[programStageName])
            const filter = {
                occurredAfter: days[0],
                occurredBefore: days[days.length - 1]
            }

            await getEvents({
                program,
                ...filter,
                orgUnit,
                ouMode: "SELECTED",
                programStage: programStageId,
                fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                trackedEntity: trackedEntity,
                skipPaging: true
            }).then((resp: any[]) => {

                let thisTeiEvents = events.filter(x => x.enrollment === enrollment)
                let alreadyExistingEvents: any = {}

                resp?.filter(x => x.enrollment === enrollment).map((x) => {
                    alreadyExistingEvents[format(new Date(x.occurredAt), 'yyyy-MM-dd')] = x.event
                })

                thisTeiEvents.forEach(event => {
                    if (alreadyExistingEvents[event.occurredAt]) {
                        updateEvents.push({ ...event, event: alreadyExistingEvents[event.occurredAt] });
                    } else {
                        newEvents.push(event);
                    }
                });
            })
        }

        console.log(newEvents, updateEvents)
    }

    async function postData(data: any[], module: "attendance" | "final-result" | "enrollment" | "performance", orgUnit: string, excelData?: any[]) {

    }

    return { postData, stats, postAttendanceData }
}