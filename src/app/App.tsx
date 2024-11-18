import React from 'react'
import { useExportData } from '../SEMISFunctions/exportData/exportData'
import student from '../utils/constants/student.json'

function MyApp() {
    const { exportData } = useExportData({
        fileName: "teste",
        orgUnit: "Shc3qNhrPAz",
        orgUnitName: "Albion LBS",
        stagesToExport: [student.performance.programStages[0].programStage, student.performance.programStages[2].programStage],
        module: "performance",
        sectionType: "student",
        eventFilters: [`iDSrFrrVgmX:in:2023`],
        startDate: '2024-11-16',
        endDate: "2024-11-21",
        seletecSectionDataStore: student
    })

    return (
        <div>
            <button onClick={async () => await exportData()} >Click-me</button>
        </div>
    )
}
export default MyApp
