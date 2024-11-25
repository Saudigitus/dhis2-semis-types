import { DropZone } from 'dhis2-semis-components'
import React from 'react'
import { useValidation } from '../../hooks/template_validation/useValidation'
import { modules } from '../../types/commons/moduleTypes'

function TemplateValidation() {
    const UseValidation = new useValidation()

    const onValidation = (file: File) => {
        UseValidation.setModule(modules.attendance)
        UseValidation.validation(file[0])
    }


    return (
        <DropZone accept='' onSave={(file) => onValidation(file)} />
    )
}

export default TemplateValidation