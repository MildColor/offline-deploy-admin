import Button from '@components/common/Button/Button'
import React, { FormEvent, useState } from 'react'
import { Input, LabelInput } from '@components/common/Input/Input'
import { suggestedTermsMutations } from '@hooks/queries/suggestedTerms'
import { useForm } from '@hooks/common/Form/useForm'
import { BoardFrame } from '@components/common/Board/Board'
import { useTag } from '@hooks/common/Tag/useTag'
import Label from '@components/common/Label/Label'
import TagFrame from '@components/common/Tag/TagFrame'

function RegisterRecommendedSearchTerms() {
    const { mutate } = suggestedTermsMutations.usePostSuggestedTerms();

    const [tagArr, handleAddTag, handleDeleteTag] = useTag([]);
    const [state, onChange, setState] = useForm({
        keyword: '',
    })
    const [errorMsg, setErrorMsg] = useState('')

    // handler
    const handleClickSubmit = () => {
        const { keyword } = state;

        if(!keyword) {
            setErrorMsg("키워드를 입력해 주세요.");
            return;
        }
        if(tagArr.length === 0){
            setErrorMsg("추천 검색어를 입력해 주세요.");
            return;
        }

        const requestParams = {
            ...state,
            sgtWord: tagArr,
        }
        mutate(requestParams, {
            onError: (error: onErrorType) => {
                const { 
                    data: { message } 
                } = error.response
                
                setErrorMsg(message)
            },
        })
    }

    return (
        <>
            <LabelInput
                labelText="키워드"
                name="keyword"
                important={true}
                required={true}
                onChange={onChange}
                value={state.keyword}
            />
            <BoardFrame margin={'1rem 0'} alignItems="flex-start">
                <Label
                    width='14rem'
                    textLineHeight="2.4rem"
                    height="2rem"
                >
                    추천 검색어
                    <span className="importantSpan">*</span>
                </Label>
                <TagFrame
                    name='sgtWord'
                    tagArr={tagArr}
                    onAddTagHandler={handleAddTag}
                    onDeleteTagHandler={handleDeleteTag}
                />
            </BoardFrame>

            {errorMsg && (
                <BoardFrame variant="warning" margin="0.5rem 0">
                    {errorMsg}
                </BoardFrame>
            )}

            <BoardFrame margin="1rem 0" justifyContent="center">
                <Button variant="normal" onClick={handleClickSubmit}>
                    등록
                </Button>
            </BoardFrame>
        </>
    )
}

export default RegisterRecommendedSearchTerms