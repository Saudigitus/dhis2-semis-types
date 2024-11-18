import React from 'react'
import { RecoilRoot } from 'recoil'
import { RulesEngineForm } from './RulesEngineForm'
import RulesEngineWrapper from '../../hooks/programRules/wrapper/RulesEngineWrapper'

const TestRulesEngine = () => (
    <RecoilRoot>
        <RulesEngineWrapper program='wQaiD2V27Dp' columns={[]}>
            <RulesEngineForm />
        </RulesEngineWrapper>
    </RecoilRoot>
)

export default TestRulesEngine