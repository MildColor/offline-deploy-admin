import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { Input, LabelInput } from '@components/common/Input/Input'
import Label from '@components/common/Label/Label'
import TagFrame from '@components/common/Tag/TagFrame'
import { useForm } from '@hooks/common/Form/useForm'
import { useTag } from '@hooks/common/Tag/useTag'
import { dictionaryMutations } from '@hooks/queries/dictionary'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { flexCenter, flexRow } from '@styles/mixins'
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import React, { useState } from 'react'
import styled from 'styled-components'

interface SynonymDetailedManagementType {
    synonymDetail: SynonymDictionaryType
}

function SynonymDetailedManagement({
    synonymDetail,
}: SynonymDetailedManagementType) {
    const { synomDictId, keyword, synomWord, createrName, updatedAt } =
        synonymDetail

    const [state, onChange] = useForm(
        {
            synomDictId,
            keyword,
            synomWord,
        },
        { useTrim: true }
    )

    const [tagArr, handleAddTag, handleDeleteTag] = useTag(synomWord.split(' '))

    const [errorMsg, setErrorMsg] = useState('')

    const { mutate: updateSynonymMutate } =
        dictionaryMutations.useUpdateSynonymDictionary()
    const { mutate: deleteSynonymMutate } =
        dictionaryMutations.useDeleteSynonymDictionary()

    const handleClickEdit = () => {
        updateSynonymMutate(state, {
            onError: (error: onErrorType) => {
                const { message } = error.response.data

                setErrorMsg(message)
            },
        })
    }

    const handleClickDelete = () => {
        deleteSynonymMutate(synomDictId)
    }

    return (
        <>
            <LabelInput
                labelText="단어"
                margin="1rem 0"
                labelWidth="10rem"
                name="keyword"
                onChange={onChange}
                value={state.keyword}
            />

            <BoardFrame margin="1rem 0">
                <Label width="10rem" textLineHeight="2rem" height="2rem">
                    동의어
                </Label>
                <TagFrame
                    name="synomWord"
                    tagArr={tagArr}
                    onAddTagHandler={handleAddTag}
                    onDeleteTagHandler={handleDeleteTag}
                />
            </BoardFrame>

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
            <BoardFrame
                justifyContent="center"
                alignItems="center"
                margin="2rem 0"
            >
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

export default SynonymDetailedManagement

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
