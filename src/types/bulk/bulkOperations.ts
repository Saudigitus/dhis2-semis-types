import { ProgramConfig } from "../programConfig/ProgramConfig"

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
     * Eg: if you want to export attendance data, send the id of the attendance programme stage, and so on.
     *
     * @type {string}
     */
    programStageIdToExport: string

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
     * If no value is passed, the section will have the display name of the program stage
     *
     * @type {?string}
     */
    dataName?: string
}

interface GenerateHeaders {
    programStageIdToExport: string
    socioEconomicsId: string
    withSocioEconomics: boolean
    programConfig: ProgramConfig
    registration: string
    sectionType: string
}

export { ExportData, GenerateHeaders }