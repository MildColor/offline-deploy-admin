import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { Input, LabelInput } from '@components/common/Input/Input'
import Label from '@components/common/Label/Label'
import { useForm } from '@hooks/common/Form/useForm'
import { useModal } from '@hooks/common/Modal/useModal'
import { dictionaryMutations } from '@hooks/queries/dictionary'
import React, { useState } from 'react'

function RegisterForbiddenTerms() {
    const { closeModal } = useModal()
    const [state, onChange, setState] = useForm(
        {
            keyword: '',
        },
        { useTrim: true }
    )
    const [errorMsg, setErrorMsg] = useState('')
    const { mutate: postStopWordDictionaryMutate } =
        dictionaryMutations.usePostForbiddenDictionary()
    const handleStopWordRegistration = () => {
        postStopWordDictionaryMutate(state, {
            onError: (error) => {
                const { message } = error.response.data

                setErrorMsg(message)
            },
        })
    }
    return (
        <>
            <BoardFrame direction="column">
                <LabelInput
                    labelText="단어"
                    margin="2rem 0"
                    labelWidth="7rem"
                    name="keyword"
                    onChange={onChange}
                    value={state.keyword}
                />
                <BoardFrame variant="warning" margin="2rem 0">
                    {errorMsg}
                </BoardFrame>
                <BoardFrame
                    justifyContent="center"
                    alignItems="center"
                    margin="1rem 0"
                >
                    <Button
                        variant="normal"
                        onClick={handleStopWordRegistration}
                    >
                        등록
                    </Button>
                </BoardFrame>
            </BoardFrame>
        </>
    )
}

export default RegisterForbiddenTerms
