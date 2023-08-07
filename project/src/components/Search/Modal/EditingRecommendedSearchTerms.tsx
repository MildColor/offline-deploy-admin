import Button from '@components/common/Button/Button'
import React, { useState } from 'react'
import { Input, LabelInput } from '@components/common/Input/Input'
import { BoardFrame } from '@components/common/Board/Board'
import { suggestedTermsMutations } from '@hooks/queries/suggestedTerms'
import { useForm } from '@hooks/common/Form/useForm'
import TagFrame from '@components/common/Tag/TagFrame'
import { useTag } from '@hooks/common/Tag/useTag'
import Label from '@components/common/Label/Label'

interface EditingRecommendedSearchTermsProps {
    termDetail: SuggestedTermsDetailType
}

function EditingRecommendedSearchTerms({ termDetail }: EditingRecommendedSearchTermsProps) {
    const { sgtWordId, keyword, sgtWord } = termDetail;

    const { mutate: updateMutate } = suggestedTermsMutations.useUpdateSuggestedTerms();
    const { mutate: deleteMutate } = suggestedTermsMutations.useDeleteSuggestedTerms();

    const [tagArr, handleAddTag, handleDeleteTag] = useTag(sgtWord);
    const [state, onChange, setState] = useForm({
        keyword: keyword,
    })
    const [errorMsg, setErrorMsg] = useState('')

    // button handler
    const handleClickEdit = () => {
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
            sgId: sgtWordId,
            sgtWord: tagArr
        }
        updateMutate(requestParams, {
            onError: (error: onErrorType) => {
                const { 
                    data: { message } 
                } = error.response
                
                setErrorMsg(message)
            },
        });
    }

    const handleClickDelete = () => {
        deleteMutate(sgtWordId);
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
export default EditingRecommendedSearchTerms