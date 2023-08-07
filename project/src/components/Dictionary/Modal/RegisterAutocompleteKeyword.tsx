import React, { FormEvent, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { LabelInput } from '@components/common/Input/Input'
import { autocompeleteMutations } from '@hooks/queries/autocomplete'
import { useForm } from '@hooks/common/Form/useForm'
import { objectValuesToArray } from '@utils/objectValuesToArray'
import { emptyStringValidator } from '@utils/validators'

function RegisterAutocompleteKeyword() {
    const [state, onChange, setState] = useForm({
        keyword: '',
        trfKeyword: '',
        weightedVal: 1,
    })
    const { mutate } = autocompeleteMutations.usePostAutocompleteTerms()

    const [errorMsg, setErrorMsg] = useState('')

    const formValidator = () => {
        const arr = objectValuesToArray(state)
        const hasEmptyString = emptyStringValidator([...arr])

        const result = ![hasEmptyString].includes(false)

        !result && setErrorMsg('작성란을 다시 확인해 주세요')

        return result
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        formValidator() &&
            mutate(state, {
                onError: (error: onErrorType) => {
                    const {
                        data: {
                            data: { errorCode },
                        },
                    } = error.response

                    setErrorMsg(errorCode)
                },
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <LabelInput
                    labelText="단어"
                    name="keyword"
                    margin="0.5rem 0"
                    onChange={onChange}
                    value={state.keyword}
                />
                <LabelInput
                    labelText="자동완성 키워드"
                    name="trfKeyword"
                    margin="0.5rem 0"
                    onChange={onChange}
                    value={state.trfKeyword}
                />
                <LabelInput
                    labelText="가중치"
                    name="weightedVal"
                    margin="0.5rem 0"
                    subText="(가중치는 1~ 10까지 가능합니다)"
                    min={1}
                    max={10}
                    type="number"
                    onChange={onChange}
                    value={state.weightedVal}
                />
                <BoardFrame variant="warning" margin="1rem 0">
                    {errorMsg}
                </BoardFrame>
                <BoardFrame justifyContent="center" margin="1rem 0">
                    <Button variant="normal">등록</Button>
                </BoardFrame>
            </form>
        </>
    )
}

export default RegisterAutocompleteKeyword
