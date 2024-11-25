import React, { useEffect } from 'react'
import student from '../utils/constants/student.json'
import { useGetProgramConfig } from '../hooks/programConfig/useGetprogramConfig'
import { useExportData } from '../hooks/bulkExport/exportData'

function MyApp() {
    const { getProgram, programConfig } = useGetProgramConfig()

    const { exportData } = useExportData({
        fileName: "test33e",
        orgUnit: "Shc3qNhrPAz",
        orgUnitName: "Albion LBS",
        stagesToExport: [...student.performance.programStages.map(x=>x.programStage)],
        module: "performance",
        sectionType: "student",
        eventFilters: [`iDSrFrrVgmX:in:2023`],
        startDate: '2024-07-16',
        endDate: "2024-11-21",
        seletedSectionDataStore: student,
        programConfig,
    })

    useEffect(() => {
        void getProgram(student.program)
    }, [])

    return (
        <div>
            <button onClick={async () => await exportData()} >Click-me</button>
        </div>
    )
}
export default MyApp
