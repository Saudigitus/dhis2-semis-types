import React, { useEffect } from 'react'
import { useExportData } from '../SEMISFunctions/exportData/exportData'
import student from '../utils/constants/student.json'
import { useGetProgramConfig } from '../hooks/programConfig/useGetprogramConfig'

function MyApp() {
    const { getProgram, programConfig } = useGetProgramConfig()
    const { exportData } = useExportData({
        fileName: "teste",
        orgUnit: "Shc3qNhrPAz",
        orgUnitName: "Albion LBS",
        stagesToExport: [student.attendance.programStage],
        module: "attendance",
        sectionType: "student",
        eventFilters: [`iDSrFrrVgmX:in:2023`],
        startDate: '2024-11-16',
        endDate: "2024-11-21",
        seletecSectionDataStore: student,
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
