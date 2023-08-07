import Button from '@components/common/Button/Button'
import React, { FormEvent, useState } from 'react'
import { Input, LabelInput } from '@components/common/Input/Input'
import { flexCenter, flexColumn } from '@styles/mixins'
import styled from 'styled-components'
import { BoardFrame } from '@components/common/Board/Board'
import { useForm } from '@hooks/common/Form/useForm'
import { popularTermsMutations } from '@hooks/queries/popularTerms'
import RankSelectBox from '@components/common/SelectBox/Rank/RankSelectBox'

function RegisterOverridingSearchTerms() {
    const [isReplaceRequired, setIsReplaceRequired] = useState(false);

    const { mutate: createMutation } = popularTermsMutations.usePostOverridingSearchTerms();
    const { mutate: modifyMutation } = popularTermsMutations.usePostOverridingSearchTermsByRank();

    const [state, onChange, setState] = useForm({
        keyword: '',
        rank: '',
    })
    const [errorMsg, setErrorMsg] = useState('')

    // handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { keyword, rank } = state;
        const rankVal = parseInt(rank);
        
        if(!keyword) return;
        if(!rank) return setErrorMsg("순위를 입력해 주세요.");
        if(rankVal < 1 || rankVal > 10) return setErrorMsg("순위 범위를 확인해 주세요.");

        createMutation(state, {
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
        setState((prev) => { return {...prev, rank: '', keyword: ''} })
        setIsReplaceRequired(false);
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

                {!isReplaceRequired  
                ?   <BoardFrame margin="1rem 0" justifyContent="center">
                        <Button variant="normal" type="submit">
                            등록
                        </Button>
                    </BoardFrame> 
                :   <BoardFrame margin="1rem 0" justifyContent="center">
                        <Button variant="normal" onClick={handleModify}>
                            수정
                        </Button>
                        <Button variant="normal" onClick={handleCancelModify}>
                            취소
                        </Button>
                    </BoardFrame>
                }
                
            </form>
        </>
    )
}

export default RegisterOverridingSearchTerms
