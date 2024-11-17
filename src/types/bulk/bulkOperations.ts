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
     * The id of the program in which the data will be fetched
     *
     * @type {string}
     */
    program: string

    /**
     * The id of the organisationa unit from which the data will be retrieved
     *
     * @type {string}
     */
    orgUnit: string

    /**
     * The id of the programme stage to which you want to export the data.
     * 
     * If this variavel is null, the program will only export data of the enrollment module,
     * 
     * wich is student profile, enrollment details and socio economics data 
     * 
     * Eg: if you want to export attendance data, send the id of the attendance programme stage, and so on.
     *
     * @type {?string}
     */
    programStageIdToExport?: string

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
     * All exported files, regardless of the module, will always contain registration data,
     * 
     * so you should send the id of that programstage in this variable.
     *
     * @type {string}
     */
    registrationStage: string

    /**
     * The data of the socio-economics partner is not mandatory, if you want this data 
     * 
     * in your exported file you must set this v to true.
     *
     * @type {?boolean}
     */
    withSocioEconomics?: boolean

    /**
     * socio economics program stage Id
     *
     * @type {?string}
     */
    socioEconomicsId?: string

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
}

interface GenerateHeaders {
    programStageIdToExport: string
    socioEconomicsId: string
    withSocioEconomics: boolean
    programConfig: ProgramConfig
    registration: string
    sectionType: string
}

export { ExportData, GenerateHeaders, modules }