import React, { Fragment, useEffect } from 'react'
import FetchEngineVariables from './FetchEngineVariables';
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { initializeRulesEngine } from '../rules-engine/InitializeRulesEngine';
import { RulesEngineWrapperProps } from '../../../types/programRules/RulesEngineProps';

export default function RulesEngineWrapper(props: RulesEngineWrapperProps) {
    const { program, columns } = props;
    const { initialize } = initializeRulesEngine()
    const { loading, error } = FetchEngineVariables(program)

    useEffect(() => {
        initialize(columns)
    }, [loading, error])

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        return (
            <CenteredContent>
                Something went wrong wen loading the app program rules, please check if you app is already configured.
            </CenteredContent>
        )
    }

    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}