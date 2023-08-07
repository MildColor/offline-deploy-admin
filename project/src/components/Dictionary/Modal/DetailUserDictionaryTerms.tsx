import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import {
    CheckBoxInput,
    LabelInput,
    SearchInput,
} from '@components/common/Input/Input'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from '@hooks/common/Form/useForm'
import { dictionaryMutations } from '@hooks/queries/dictionary'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { flexCenter, flexRow } from '@styles/mixins'
import theme from '@styles/theme'
import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import MultipleWordGenerator from './MultipleWordGenerator'

interface DetailUserDictionaryProps {
    userDictionaryDetail: UserDictionaryType
}
function DetailUserDictionaryTerms({
    userDictionaryDetail,
}: DetailUserDictionaryProps) {
    const {
        customDictId,
        keyword,
        rgisWord,
        type,
        createrName,
        updateName,
        createdAt,
        updatedAt,
    } = userDictionaryDetail
    const [state, onChange, setState] = useForm({
        keyword: keyword,
        searchSingleKeyword: '',
    })
    const [singleWordArr, setSingleWordArr] = useState<string[]>([])

    const [isCheckedBoxes, setIsCheckedBoxes] = useState<{
        [key: string]: boolean
    }>({
        singleWord: true,
        multiple: false,
    })

    const [errorMsg, setErrorMsg] = useState('')

    const { mutate: updateUserDictMutate } =
        dictionaryMutations.useUpdateUserDictionary()
    const { mutate: deleteUserDictMutate } =
        dictionaryMutations.useDeleteUserDictionary()

    // handler
    const handleChangeCheckBoxInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = e.target
        setErrorMsg('')

        const updatedCheckboxes = { ...isCheckedBoxes }

        for (const key in updatedCheckboxes) {
            updatedCheckboxes[key] = false
        }

        setIsCheckedBoxes({ ...updatedCheckboxes, [name]: checked })
    }

    const handleClickEdit = () => {
        if (isCheckedBoxes.singleWord && state.keyword.trim() !== '') {
            return updateUserDictMutate(
                { keyword: state.keyword },
                {
                    onError: (error: onErrorType) => {
                        const {
                            data: {
                                data: { errorCode },
                            },
                        } = error.response

                        setErrorMsg(errorCode)
                    },
                }
            )
        }

        const multipleWord = singleWordArr.join('')
        const requestMultipleWord = singleWordArr.join('+')

        if (state.keyword !== multipleWord) {
            return setErrorMsg('등록할 단어와 합성어가 일치하지 않습니다.')
        }

        return updateUserDictMutate(
            { keyword: state.keyword, rgisWord: requestMultipleWord },
            {
                onError: (error: onErrorType) => {
                    const {
                        data: {
                            data: { errorCode },
                        },
                    } = error.response

                    setErrorMsg(errorCode)
                },
            }
        )
    }
    const handleClickDelete = () => {
        deleteUserDictMutate(customDictId)
    }

    return (
        <BoardFrame direction="column" alignItems="center">
            <BoardFrame justifyContent="center" margin="1.5rem 0">
                <CheckBoxInput
                    labelText="단일어"
                    name="singleWord"
                    textLineHeight="2rem"
                    width="10rem"
                    onChange={handleChangeCheckBoxInput}
                    checked={isCheckedBoxes.singleWord}
                />
                <CheckBoxInput
                    labelText="합성어"
                    name="multiple"
                    textLineHeight="2rem"
                    width="10rem"
                    onChange={handleChangeCheckBoxInput}
                    checked={isCheckedBoxes.multiple}
                />
            </BoardFrame>
            <LabelInput
                labelText="단어"
                margin="1rem 0"
                labelWidth="7rem"
                name="keyword"
                onChange={onChange}
                value={state.keyword}
            />

            {isCheckedBoxes.multiple && (
                <>
                    <Span>등록단어</Span>
                    <MultipleWordGenerator
                        searchSingleKeyword={state.searchSingleKeyword}
                        onChange={onChange}
                        singleWordArr={singleWordArr}
                        setSingleWordArr={setSingleWordArr}
                    />
                </>
            )}
            <BoardFrame variant="warning" margin="2rem 0">
                {errorMsg}
            </BoardFrame>
            <BoardFrame justifyContent="center" alignItems="center">
                <Button variant="normal" onClick={handleClickEdit}>
                    수정
                </Button>
                <Button variant="normal" onClick={handleClickDelete}>
                    삭제
                </Button>
            </BoardFrame>
        </BoardFrame>
    )
}

export default DetailUserDictionaryTerms

const Span = styled.span`
    margin-top: 1.5rem;
    display: inline-block;
    align-self: flex-start;
`
