import { Form } from "react-final-form";
import { useRecoilState } from 'recoil';
import { WithPadding, GroupForm } from "dhis2-semis-components"
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { ProgramRulesFormatedState } from '../../schema/programRulesFormated';
import { RulesEngine } from '../../hooks/programRules/rules-engine/RulesEngine';
import { formatKeyValueType } from '../../utils/programRules/formatKeyValueType';
import { fields } from "../../utils/constants/fields";

export const RulesEngineForm = (props: any) => {
    const { } = props;
    const [values, setValues] = useState<Record<string, string>>({})
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const { runRulesEngine, updatedVariables } = RulesEngine({ variables: fields, values, type: "programStageSection", formatKeyValueType: formatKeyValueType([]) })

    useEffect(() => {
        runRulesEngine(fields)
    }, [values])

    function onSubmit() { }

    function onChange(e: any): void {
        setValues(e)
    }

    return (
        <Fragment>
            <WithPadding>
                <Form initialValues={{}} onSubmit={onSubmit}>
                    {({ handleSubmit, values, form }) => {
                        formRef.current = form;
                        return <form
                            onSubmit={handleSubmit}
                            onChange={onChange(values) as unknown as () => void}
                        >
                            {
                                updatedVariables?.map((field: any, index: number) => {
                                    return (
                                        <GroupForm
                                            key={index}
                                            name={field.section}
                                            fields={field.fields}
                                            description={field.description}
                                        />
                                    )
                                })
                            }
                        </form>
                    }}
                </Form>
            </WithPadding >
        </Fragment>
    )
}