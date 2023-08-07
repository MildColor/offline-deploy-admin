import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { Input, LabelInput } from '@components/common/Input/Input'
import Label from '@components/common/Label/Label'
import { useForm } from '@hooks/common/Form/useForm'
import { dictionaryMutations } from '@hooks/queries/dictionary'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { flexCenter, flexRow } from '@styles/mixins'
import React, { useState } from 'react'
import styled from 'styled-components'

interface ForbiddenTermsDetailManagemenType {
    stopwordDetail: StopwordDictionaryType
}

function ForbiddenTermsDetailManagement({
    stopwordDetail,
}: ForbiddenTermsDetailManagemenType) {
    console.log('fcomp', stopwordDetail)

    const {
        stwdDictId,
        keyword,
        createrName,
        updaterName,
        createdAt,
        updatedAt,
    } = stopwordDetail

    const [state, onChange] = useForm(
        {
            keyword,
            createrName,
            updatedAt,
        },
        { useTrim: true }
    )
    const [errorMsg, setErrorMsg] = useState('')

    const { mutate: deleteStopwordMutate } =
        dictionaryMutations.useDeleteForbiddenDictionary()

    const handleClickDelete = () => {
        deleteStopwordMutate(stwdDictId, {
            onError: (error: onErrorType) => {
                const { message } = error.response.data

                setErrorMsg(message)
            },
        })
    }
    return (
        <>
            <LabelInput
                labelText="단어"
                margin="0.5rem 0"
                labelWidth="7rem"
                name="keyword"
                readOnly
                value={state.keyword}
            />

            <BoardFrame
                margin="1rem 0"
                padding="0 3rem"
                alignItems="center"
                justifyContent="space-between"
            >
                <Row>
                    <SemiBoldSpan>작성자</SemiBoldSpan>
                    <span>{createrName}</span>
                </Row>
                <Row>
                    <SemiBoldSpan>
                        최종
                        <br /> 등록날짜
                    </SemiBoldSpan>
                    <span>{updatedAt.slice(0, 10)}</span>
                </Row>
            </BoardFrame>
            <BoardFrame variant="warning" margin="0.5rem 0">
                {errorMsg}
            </BoardFrame>
            <BoardFrame justifyContent="center">
                <Button variant="normal" onClick={handleClickDelete}>
                    삭제
                </Button>
            </BoardFrame>
        </>
    )
}

export default ForbiddenTermsDetailManagement

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
