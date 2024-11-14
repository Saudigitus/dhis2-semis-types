interface ExportData {
    fileName: string
    program: string
    orgUnit: string
    programStageIdToExport: string
    eventFilters?: any[]
    orgUnitName: string
    registrationStage: string
    withSocioEconomics?: boolean
    socioEconomicsId?: string
}

export { ExportData }