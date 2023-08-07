import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { LabelInput } from '@components/common/Input/Input'
import { useForm } from '@hooks/common/Form/useForm'
import { autocompeleteMutations } from '@hooks/queries/autocomplete'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { flexCenter, flexRow } from '@styles/mixins'
import { objectValuesToArray } from '@utils/objectValuesToArray'
import { emptyStringValidator } from '@utils/validators'
import React, { useState } from 'react'
import styled from 'styled-components'

interface AutoCompleteTermDetail {
    autoCompleteTermDetail: AutoCompleteTermType
}

function AutocompleteKeywordDetailManagement({
    autoCompleteTermDetail,
}: AutoCompleteTermDetail) {
    console.log('autoCompleteTermDetail', autoCompleteTermDetail)
    const {
        autoFixDictId,
        keyword,
        trfKeyword,
        weightedVal,
        createdAt,
        username,
    } = autoCompleteTermDetail

    // hooks
    const [state, onChange, setState] = useForm({
        autoFixDictId,
        keyword,
        trfKeyword,
        weightedVal,
    })
    const [errorMsg, setErrorMsg] = useState('')

    // 통신
    const { mutate: updateAutocompleteTermMutate } =
        autocompeleteMutations.useUpdateAutocompleteTerms()
    const { mutate: deleteAutocompleteTermMutate } =
        autocompeleteMutations.useDeleteAutocompleteTerms()

    // 유효성 검사
    const formValidator = () => {
        const stringArr = objectValuesToArray(state)
        const hasEmptyString = emptyStringValidator([...stringArr])

        return ![hasEmptyString].includes(false)
    }
    // handler
    const handleClickEdit = () => {
        formValidator()
            ? updateAutocompleteTermMutate(state)
            : setErrorMsg('빈칸을 전부 작성해 주세요')
    }

    const handleClickDelete = () => {
        deleteAutocompleteTermMutate(autoFixDictId)
    }

    return (
        <>
            <LabelInput
                labelText="단어"
                margin="0.5rem 0"
                name="keyword"
                onChange={onChange}
                value={state.keyword}
            />
            <LabelInput
                labelText="자동완성 키워드"
                margin="0.5rem 0"
                name="trfKeyword"
                onChange={onChange}
                value={state.trfKeyword}
            />
            <LabelInput
                labelText="가중치"
                margin="0.5rem 0"
                subText="(가중치는 1~ 10까지 가능합니다)"
                type="number"
                name="weightedVal"
                min={1}
                max={10}
                onChange={onChange}
                value={state.weightedVal}
            />
            <BoardFrame
                margin="1rem 0"
                padding="0 3rem"
                alignItems="center"
                justifyContent="space-between"
            >
                <Row>
                    <SemiBoldSpan>작성자</SemiBoldSpan>
                    <span>{username}</span>
                </Row>
                <Row>
                    <SemiBoldSpan>
                        최종
                        <br /> 등록날짜
                    </SemiBoldSpan>
                    <span>{createdAt.slice(0, 10)}</span>
                </Row>
            </BoardFrame>
            <BoardFrame variant="warning" margin="0.5rem 0">
                {errorMsg}
            </BoardFrame>
            <BoardFrame justifyContent="center" width="100%" margin="1.5rem 0">
                <Button variant="normal" onClick={handleClickEdit}>
                    수정
                </Button>
                <Button variant="normal" onClick={handleClickDelete}>
                    삭제
                </Button>
            </BoardFrame>
        </>
    )
}

export default AutocompleteKeywordDetailManagement

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
