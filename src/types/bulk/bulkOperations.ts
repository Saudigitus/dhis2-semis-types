import { DataStoreRecord } from "../dataStore/DataStoreConfig"
import { ProgramConfig } from "../programConfig/ProgramConfig"

enum modules {
    attendance = "attendance",
    final_result = "final-result",
    enrollment = "enrollment",
    performance = "performance",
}

/**
 * Description placeholder
 *
 * @interface ExportData
 * @typedef {ExportData}
 */
interface ExportData {
    /**
     * Exported file name
     *
     * @type {string}
     */
    fileName: string

    /**
     * The id of the organisationa unit from which the data will be retrieved
     *
     * @type {string}
     */
    orgUnit: string

    /**
     * Array of program stages id to export data
     * 
     * @type {string[]}
     */
    stagesToExport: string[]

    /**
     * The array of filters applied to the headers (class and grid)
     *
     * @type {?any[]}
     */
    eventFilters?: any[]

    /**
     * The selected org unit name
     *
     * @type {string}
     */
    orgUnitName: string

    /**
     * The data of the socio-economics stge is not mandatory, if you want this data 
     * 
     * in your exported file you must set this variable to true. 
     * 
     * This does not apply to the enrollment module. In the enrollment module, the 
     * 
     * values for this stage will always be exported
     *
     * @type {?boolean}
     */
    withSocioEconomics?: boolean

    /**
     * selected section type name
     *
     * @type {string}
     */
    sectionType: string

    /**
     * Depending on the module, the data is exported with a focus on just one programme stage,
     * 
     * so this variable is intended to receive the name of the section that will contain this data.
     *
     * @type {?string}
     */
    module: "attendance" | "final-result" | "enrollment" | "performance",

    /**
     * if you want to export attendace data you need to set a date range, so, this variable will
     * 
     * get the start date in this formtat: yyyy-MM-dd
     *
     * @type {?string}
     */
    startDate?: string

    /**
     * if you want to export attendace data you need to set a date range, so, this variable will
     * 
     * get the end date in this formtat: yyyy-MM-dd
     *
     * @type {?string}
     */
    endDate?: string

    /**
     * Settings saved at data store
     *
     * @type {DataStoreRecord}
     */
    seletedSectionDataStore?: DataStoreRecord

    /**
    * Program configurations
    *
    * @type {ProgramConfig}
    */
    programConfig: ProgramConfig

    /**
    * function tha chekcs if the given date is school day or no
    *
    * @type {function}
    */
    unavailableSchoolDays?: (date: Date) => boolean
}

interface GenerateHeaders {
    stagesToExport: string[]
    seletedSectionDataStore: DataStoreRecord
    withSocioEconomics: boolean
    programConfig: ProgramConfig
    sectionType: string
    unavailableSchoolDays?: (date: Date) => boolean
    startDate?: string
    endDate?: string
    module: string
}

interface excelProps {
    headers: any[]
    rows: any[]
    filters: any
    fileName: string
    metadata: any[]
    module: string
    ids: string[]
}

export { ExportData, GenerateHeaders, modules, excelProps }