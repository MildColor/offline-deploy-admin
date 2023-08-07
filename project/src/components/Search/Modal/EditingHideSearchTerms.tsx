import React, { FormEvent, useState } from 'react'
import Button from '@components/common/Button/Button'
import { Input, LabelInput } from '@components/common/Input/Input'
import { flexCenter, flexColumn } from '@styles/mixins'
import styled from 'styled-components'
import { BoardFrame } from '@components/common/Board/Board'
import { useForm } from '@hooks/common/Form/useForm'
import { popularTermsMutations, popularTermsQueries } from '@hooks/queries/popularTerms'

interface EditingHideSearchTermsProps {
    detail: HideSearchTermDetail
}

function EditingHideSearchTerms({ detail }: EditingHideSearchTermsProps) {
    // query values
    const [queryStrings, setQueryStrings] = useState({
        phId: detail.id,
    })
    // const { data: terms } = popularTermsQueries.useGetOverridingSearchTermsById({
    //     ...queryStrings,
    // })

    // mutation
    const { mutate: updateMutate } = popularTermsMutations.useUpdateHideSearchTerms();
    const { mutate: deleteMutate } = popularTermsMutations.useDeleteHideSearchTerms();

    const [state, onChange, setState] = useForm({
        ...queryStrings,
        keyword: detail.keyword,
    })
    const [errorMsg, setErrorMsg] = useState('')

    const handleCLickSubmit = () => {
        const { keyword } = state;

        if( !keyword ) return

        updateMutate(state, {
            onError: (error: onErrorType) => {
                const {
                    data: { message },
                } = error.response

                setErrorMsg(message)
            },
        })
    }
    const handleClickDelete = () => {
        deleteMutate(queryStrings.phId, {
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
            <LabelInput
                labelText="검색어"
                name="keyword"
                important={true}
                required={true}
                onChange={onChange}
                value={state.keyword}
                margin="0.5rem 0" 
            />

            {errorMsg && (
                <BoardFrame variant="warning" margin="0.5rem 0">
                    {errorMsg}
                </BoardFrame>
            )}
            
            <BoardFrame margin="1rem 0" justifyContent="center">
                <Button variant="normal" onClick={handleCLickSubmit}>
                    수정
                </Button>
                <Button variant="normal" onClick={handleClickDelete}>
                    삭제
                </Button>
            </BoardFrame>
        </>
    )
}

export default EditingHideSearchTerms