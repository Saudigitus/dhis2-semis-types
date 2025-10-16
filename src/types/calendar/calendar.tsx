
interface defaults {
    academicYear: string
}

interface ClassPeriodType {
    key: string
    description: string
    endDate: string
    startDate: string
}

interface HolidayType {
    date: Date
    event: string
    type: string
}

interface SchoolCalendarType {
    id: string
    key: string
    defaults: defaults
    academicYear: {
        "endDate": string
        "startDate": string
        "code": string
        "label": string
        "description": string
        "type": string
    }
    classPeriods: ClassPeriodType[]
    holidays: HolidayType[]
    weekDays: {
        "friday": boolean
        "monday": boolean
        "saturday": boolean
        "sunday": boolean
        "thursday": boolean
        "tuesday": boolean
        "wednesday": boolean
    }
}

export type { SchoolCalendarType }