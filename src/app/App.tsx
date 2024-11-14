import React from 'react'
import { useExportData } from '../SEMISFunctions/exportData/exportData'

function MyApp() {
    const { exportData } = useExportData({ fileName: "teste", orgUnit: "Shc3qNhrPAz", orgUnitName: "Albion LBS", program: "wQaiD2V27Dp", programStageIdToExport: "Ljyrr3cktAr", registrationStage: "Ni2qsy2WJn4", })

    return (
        <div>
            <button onClick={async () => await exportData()} >Click-me</button>
        </div>
    )
}
export default MyApp
