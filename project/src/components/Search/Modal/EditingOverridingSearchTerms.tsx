import React, { FormEvent, useEffect, useState } from 'react'
import Button from '@components/common/Button/Button'
import { Input, LabelInput } from '@components/common/Input/Input'
import { flexCenter, flexColumn } from '@styles/mixins'
import styled from 'styled-components'
import { BoardFrame } from '@components/common/Board/Board'
import { useForm } from '@hooks/common/Form/useForm'
import { popularTermsMutations } from '@hooks/queries/popularTerms'
import RankSelectBox from '@components/common/SelectBox/Rank/RankSelectBox'

interface EditingOverridingSearchTermsProps {
    detail: OverridingSearchTermDetail
}

function EditingOverridingSearchTerms({ detail }: EditingOverridingSearchTermsProps) {
    const [isReplaceRequired, setIsReplaceRequired] = useState(false);
    // query values
    const [queryStrings, setQueryStrings] = useState({
        pfId: detail.id,
    })
    // const { data: terms } = popularTermsQueries.useGetOverridingSearchTermsById({
    //     ...queryStrings,
    // })

    // mutation
    const { mutate: updateMutate } = popularTermsMutations.useUpdateOverridingSearchTerms();
    const { mutate: modifyMutation } = popularTermsMutations.usePostOverridingSearchTermsByRank();
    const { mutate: deleteMutate } = popularTermsMutations.useDeleteOverridingSearchTerms();
    
    const [state, onChange, setState] = useForm({
        ...queryStrings,
        keyword: detail.keyword,
        rank: detail.rank,
    })
    const [errorMsg, setErrorMsg] = useState('')

    const handleCLickSubmit = () => {
        const { keyword, rank} = state;
        const rankVal = parseInt(rank);

        // TODO: 이미 존재하는 값과 같을 때 막기?
        if(!keyword) return;
        if(!rank) return setErrorMsg("순위를 입력해 주세요.");
        if(rankVal < 1 || rankVal > 10) return setErrorMsg("순위 범위를 확인해 주세요.");

        updateMutate(state, {
            onError: (error: onErrorType) => {
                const {
                    data: {
                        data: { errorCode },
                        message,
                    },
                } = error.response

                setErrorMsg(message)
                if(errorCode === "RegisteredRank") {
                    setIsReplaceRequired(true);
                }
            },
        })
    }

    const handleClickDelete = () => {
        deleteMutate(queryStrings.pfId, {
            onError: (error: onErrorType) => {
                const {
                    data: { message },
                } = error.response

                setErrorMsg(message)
            },
        })
    }

    // TODO: setIsReplaceRequired가 false였다가 true로 바뀌는게 맞나..?
    const handleModify = () => {
        setIsReplaceRequired(false);

        modifyMutation(state, {
            onError: (error: onErrorType) => {
                const {
                    data: {
                        data: { errorCode },
                        message,
                    },
                } = error.response

                setErrorMsg(message)

                if(errorCode === "RegisteredRank") {
                    setIsReplaceRequired(true);
                }
            },
        })
    }
    const handleCancelModify = () => {
        setState((prev) => { return {...prev, rank: detail.rank, keyword: detail.keyword} })
        setIsReplaceRequired(false);
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
            <RankSelectBox
                state={state.rank}
                onChange={onChange}
            />

            {errorMsg && (
                <BoardFrame variant="warning" margin="0.5rem 0">
                    {errorMsg}
                </BoardFrame>
            )}
            
            {!isReplaceRequired ? 
                <BoardFrame margin="1rem 0" justifyContent="center">
                    <Button variant="normal" onClick={handleCLickSubmit}>
                        수정
                    </Button>
                    <Button variant="normal" onClick={handleClickDelete}>
                        삭제
                    </Button>
                </BoardFrame> :
                <BoardFrame margin="1rem 0" justifyContent="center">
                    <Button variant="normal" onClick={handleModify}>
                        수정
                    </Button>
                    <Button variant="normal" onClick={handleCancelModify}>
                        취소
                    </Button>
                </BoardFrame>
            }
        </>
    )
}

export default EditingOverridingSearchTerms