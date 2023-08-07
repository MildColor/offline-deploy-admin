import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { LabelInput } from '@components/common/Input/Input'
import Label from '@components/common/Label/Label'
import TagFrame from '@components/common/Tag/TagFrame'
import { useForm } from '@hooks/common/Form/useForm'
import { useTag } from '@hooks/common/Tag/useTag'
import { dictionaryMutations } from '@hooks/queries/dictionary'
import React, { useState } from 'react'

function RegisterSynonymTerms() {
    const [state, onChange] = useForm({ keyword: '' })
    const [tagArr, handleAddTag, handleDeleteTag] = useTag([])
    const [errorMsg, setErrorMsg] = useState('')

    const { mutate: postSynonymDictionaryMutate } =
        dictionaryMutations.usePostSynonymDictionary()

    const handleClickSynonymRegistration = () => {
        const tagsString = tagArr.join(',')
        console.log(tagArr)
        console.log(tagsString)

        if (!state.keyword.trim()) return setErrorMsg('키워드를 작성해주세요')
        if (!tagsString.trim()) return setErrorMsg('동의어를 작성해주세요')

        return postSynonymDictionaryMutate(
            {
                keyword: state.keyword,
                synomWord: tagsString,
            },
            {
                onError: (error) => {
                    const { message } = error.response.data
                    setErrorMsg(message)
                },
            }
        )
    }

    return (
        <>
            <LabelInput
                labelText="단어"
                margin="1rem 0"
                labelWidth="7rem"
                name="keyword"
                onChange={onChange}
                value={state.keyword}
            />
            <BoardFrame margin="1rem 0">
                <Label width="7rem" textLineHeight="2rem" height="2rem">
                    동의어
                </Label>
                <TagFrame
                    name="synomWord"
                    tagArr={tagArr}
                    onAddTagHandler={handleAddTag}
                    onDeleteTagHandler={handleDeleteTag}
                />
            </BoardFrame>
            <BoardFrame variant="warning" margin="0.5rem 0">
                {errorMsg}
            </BoardFrame>
            <BoardFrame
                justifyContent="center"
                alignItems="center"
                margin="1rem 0"
            >
                <Button
                    variant="normal"
                    onClick={handleClickSynonymRegistration}
                >
                    등록
                </Button>
            </BoardFrame>
        </>
    )
}

export default RegisterSynonymTerms
