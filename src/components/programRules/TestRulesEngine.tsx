import React from 'react'
import { RecoilRoot } from 'recoil'
import { RulesEngineForm } from './RulesEngineForm'
import { fields } from "../../utils/constants/fields";
import RulesEngineWrapper from '../../hooks/programRules/wrapper/RulesEngineWrapper'

const TestRulesEngine = () => (
    <RecoilRoot>
        <RulesEngineWrapper program='wQaiD2V27Dp' columns={fields?.map((f) => f.fields).flat()}>
            <RulesEngineForm />
        </RulesEngineWrapper>
    </RecoilRoot>
)

export default TestRulesEngine