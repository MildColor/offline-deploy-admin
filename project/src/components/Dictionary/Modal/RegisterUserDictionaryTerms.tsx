import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { CheckBoxInput, LabelInput } from '@components/common/Input/Input'
import { useForm } from '@hooks/common/Form/useForm'
import { dictionaryMutations } from '@hooks/queries/dictionary'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styled from 'styled-components'
import MultipleWordGenerator from './MultipleWordGenerator'

function RegisterUserDictionaryTerms() {
    const [state, onChange, setState] = useForm({
        keyword: '',
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

    const { mutate: singleWordMutate } =
        dictionaryMutations.usePostUserSingleWordDictionary()
    const { mutate: multipleWordMutate } =
        dictionaryMutations.usePostUserMultipleWordDictionary()

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isCheckedBoxes.singleWord && state.keyword.trim() !== '') {
            return singleWordMutate(
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

        return multipleWordMutate(
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
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                    <Button variant="normal" type="submit">
                        등록
                    </Button>
                </BoardFrame>
            </form>
        </BoardFrame>
    )
}

export default RegisterUserDictionaryTerms

const Span = styled.span`
    margin-top: 1.5rem;
    display: inline-block;
    align-self: flex-start;
`
