import React, { FormEvent, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { LabelInput } from '@components/common/Input/Input'
import { typoCorrectionMutations } from '@hooks/queries/typoCorrection'
import { useForm } from '@hooks/common/Form/useForm'

function TypoCorrectionKeywordRegistration() {
    const { mutate } = typoCorrectionMutations.usePostTypoCorreciton()

    const [state, onChange, setState] = useForm({
        keyword: '',
        trfKeyword: '',
        weightedVal: 5,
    })
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate(state, {
            onError: (error: onErrorType) => {
                const {
                    data: { message },
                } = error.response

                setErrorMsg(message)
            },
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <LabelInput
                    labelText="키워드"
                    name="keyword"
                    required={true}
                    important={true}
                    onChange={onChange}
                    value={state.keyword}
                    margin="0.5rem 0"
                />
                <LabelInput
                    labelText="자동완성 키워드"
                    name="trfKeyword"
                    required={true}
                    important={true}
                    onChange={onChange}
                    value={state.trfKeyword}
                    margin="0.5rem 0"
                />
                <LabelInput
                    labelText="가중치"
                    name="weightedVal"
                    required={true}
                    important={true}
                    onChange={onChange}
                    value={state.weightedVal}
                    margin="0.5rem 0"
                    subText="(가중치는 1~ 10까지 가능합니다)"
                />

                {errorMsg && (
                    <BoardFrame variant="warning" margin="0.5rem 0">
                        {errorMsg}
                    </BoardFrame>
                )}

                <BoardFrame justifyContent="center" width="100%" margin="3rem 0">
                    <Button variant="normal" type='submit'>등록</Button>
                </BoardFrame>
            </form>
        </>
    )
}

export default TypoCorrectionKeywordRegistration
