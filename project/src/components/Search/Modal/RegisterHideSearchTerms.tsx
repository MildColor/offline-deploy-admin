import Button from '@components/common/Button/Button'
import React, { FormEvent, useState } from 'react'
import { Input, LabelInput } from '@components/common/Input/Input'
import { flexCenter, flexColumn } from '@styles/mixins'
import styled from 'styled-components'
import { BoardFrame } from '@components/common/Board/Board'
import { useForm } from '@hooks/common/Form/useForm'
import { popularTermsMutations } from '@hooks/queries/popularTerms'

function RegisterHideSearchTerms() {
    const { mutate } = popularTermsMutations.usePostHideSearchTerms();

    const [state, onChange, setState] = useForm({
        keyword: '',
    })
    const [errorMsg, setErrorMsg] = useState('')

    // handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { keyword } = state;

        if(!keyword) return;

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
                    labelText="검색어"
                    name="keyword"
                    important={true}
                    required={true}
                    onChange={onChange}
                    value={state.keyword}
                />

                {errorMsg && (
                    <BoardFrame variant="warning" margin="0.5rem 0">
                        {errorMsg}
                    </BoardFrame>
                )}
                
                <BoardFrame margin="1rem 0" justifyContent="center">
                    <Button variant="normal" type="submit">
                        등록
                    </Button>
                </BoardFrame>
            </form>
        </>
    )
}

export default RegisterHideSearchTerms
