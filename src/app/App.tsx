import { DropZone } from 'dhis2-semis-components'
import { useValidation } from '../hooks/template_validation/useValidation'
import { modules } from '../types/commons/moduleTypes'
import React, { useEffect } from 'react'
import student from '../utils/constants/student.json'
import { useGetProgramConfig } from '../hooks/programConfig/useGetprogramConfig'
import { useExportData } from '../hooks/bulkExport/exportData'
import { useImportData } from '../hooks/bulkImport/useImportData'

function MyApp() {
    const { getProgram, programConfig } = useGetProgramConfig()
    const { importProps } = useImportData({ programConfig, seletedSectionDataStore: student, orgUnit: "Shc3qNhrPAz" })

    const { exportData } = useExportData({
        fileName: "test33e",
        orgUnit: "Shc3qNhrPAz",
        orgUnitName: "Albion LBS",
        stagesToExport: [student.attendance.programStage],
        module: "attendance",
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

    const UseValidation = new useValidation()

    const onValidation = async (file: File) => {
        const module = modules.attendance

        UseValidation.setModule(module)
        const data = await UseValidation.validation(file[0])
        importProps({ excelData: data, importMode: 'VALIDATE' })
    }

    return (
        <div>
            <button onClick={async () => { await exportData() }} >Click-me</button>
            <DropZone accept='' onSave={(file) => onValidation(file)} />
        </div>
    )

}
export default MyApp
