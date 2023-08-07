import React, { FormEvent, useEffect, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { Input, LabelInput } from '@components/common/Input/Input'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { flexCenter, flexRow } from '@styles/mixins'
import styled from 'styled-components'
import { typoCorrectionMutations, typoCorrectionQueries } from '@hooks/queries/typoCorrection'
import { useForm } from '@hooks/common/Form/useForm'

interface TypoDetailManagementProps {
    tcDetail: TypoCorrectionDetail
}

function TypoCorrectionKeywordDetailManagement({ tcDetail }: TypoDetailManagementProps) {
    // query values
    const [queryStrings, setQueryStrings] = useState({
        mtId: tcDetail.autoFixDictId,
    })
    // const { data: typo } = typoCorrectionQueries.useGetTypoCorrecitonById({
    //     ...queryStrings,
    // })

    // mutation
    const { mutate: updateMutate } = typoCorrectionMutations.useUpdateTypoCorreciton();
    const { mutate: deleteMutate } = typoCorrectionMutations.useDeleteTypoCorreciton();
    

    // TODO: api 뚫리면 typo.keyword로 바꾸기
    const [state, onChange, setState] = useForm({
        ...queryStrings,
        keyword: tcDetail.keyword,
        trfKeyword: tcDetail.trfKeyword,
        weightedVal: tcDetail.weightedVal,
    })
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { keyword, trfKeyword, weightedVal} = state;

        if( !keyword || !trfKeyword || !weightedVal) return

        if(weightedVal < 1 || weightedVal > 10 || isNaN(weightedVal)) {
            setErrorMsg('가중치 범위를 확인해 주세요.');
            return;
        }

        updateMutate(state, {
            onError: (error: onErrorType) => {
                const {
                    data: { message },
                } = error.response

                setErrorMsg(message)
            },
        })
    }

    const handleDeleteTypoCorrection = () => {
        deleteMutate(queryStrings.mtId, {
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
                    name='keyword'
                    onChange={onChange}
                    important={true}
                    required={true}
                    value={state.keyword} 
                    margin="0.5rem 0" 
                />
                <LabelInput 
                    labelText="자동완성 키워드" 
                    name='trfKeyword'
                    onChange={onChange}
                    important={true}
                    required={true}
                    value={state.trfKeyword}    
                    margin="0.5rem 0" 
                    />
                <LabelInput
                    type='number'
                    min={1}
                    max={10}
                    labelText="가중치"
                    name='weightedVal'
                    onChange={onChange}
                    important={true}
                    required={true}
                    value={state.weightedVal}
                    margin="0.5rem 0"
                    subText="(가중치는 1~ 10까지 가능합니다)"
                />

                <BoardFrame
                    margin="1rem 0"
                    padding="0 3rem"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Row>
                        <SemiBoldSpan>작성자</SemiBoldSpan>
                        <span>{tcDetail.username}</span>
                    </Row>
                    <Row>
                        <SemiBoldSpan>등록날짜</SemiBoldSpan>
                        <span>{tcDetail.createdAt}</span>
                    </Row>
                </BoardFrame>
                {errorMsg && (
                    <BoardFrame variant="warning" margin="0.5rem 0">
                        {errorMsg}
                    </BoardFrame>
                )}

                <BoardFrame justifyContent="center" width="100%" margin="3rem 0">
                    <Button variant="normal" type='submit'>수정</Button>
                    <Button variant="normal" onClick={handleDeleteTypoCorrection}>삭제</Button>
                </BoardFrame>    
            </form>
        </>
    )
}

export default TypoCorrectionKeywordDetailManagement

const SemiBoldSpan = styled.span`
    ${getTypographyStyles(TYPOGRAPHY_STYLES.Headline1_M)}
    ${flexCenter}
    text-align: center;
    margin-right: 1rem;
`
const Row = styled.div`
    ${flexRow}
    align-items: center;
    margin: 0.5rem 0;
`
