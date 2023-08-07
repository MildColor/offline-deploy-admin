import { BoardFrame } from '@components/common/Board/Board'
import { SearchInput } from '@components/common/Input/Input'
import { dictionaryQueries } from '@hooks/queries/dictionary'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flexRow } from '@styles/mixins'
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import theme from '@styles/theme'

interface MultipleWordGeneratorType {
    searchSingleKeyword: string
    singleWordArr: string[]
    setSingleWordArr: Dispatch<SetStateAction<string[]>>
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

function MultipleWordGenerator({
    searchSingleKeyword,
    singleWordArr,
    setSingleWordArr,
    onChange,
}: MultipleWordGeneratorType) {
    const { data: singleWord } =
        dictionaryQueries.useGetUserSingleWordDictionary({
            search: searchSingleKeyword,
        })

    const handleClickAddSingleWord = (word: string) => {
        setSingleWordArr([...singleWordArr, word])
    }

    const handleClickDeleteSingleWord = (indexToRemove: number) => {
        const newingleWordArr = singleWordArr.filter(
            (_, index) => index !== indexToRemove
        )
        setSingleWordArr(newingleWordArr)
    }

    return (
        <BoardFrame direction="row" height="20rem">
            <BoardFrame direction="column" width="15rem">
                <SearchInput
                    margin="0.5rem 0"
                    name="searchSingleKeyword"
                    onChange={onChange}
                    value={searchSingleKeyword}
                />
                <BoardFrame
                    variant="blueBoard"
                    useYScroll={true}
                    direction="column"
                >
                    {singleWord?.keyword && (
                        <ul>
                            <SingleWord>
                                {singleWord?.keyword}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleClickAddSingleWord(
                                            singleWord?.keyword
                                        )
                                    }
                                >
                                    +
                                </button>
                            </SingleWord>
                        </ul>
                    )}
                </BoardFrame>
            </BoardFrame>
            <BoardFrame
                alignItems="center"
                justifyContent="center"
                width="10rem"
            >
                <FontAwesomeIcon
                    size="2xl"
                    icon={faArrowRight}
                    color={theme.colors.blue[5]}
                ></FontAwesomeIcon>
            </BoardFrame>
            <BoardFrame direction="column" width="15rem">
                <SearchInput
                    margin="0.5rem 0"
                    useIcon={false}
                    value={singleWordArr.join('+')}
                    readOnly
                />
                <BoardFrame
                    variant="blueBoard"
                    useYScroll={true}
                    direction="column"
                >
                    {singleWordArr?.map((word: string, idx: number) => {
                        return (
                            <ul>
                                <SingleWord>
                                    {word}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleClickDeleteSingleWord(idx)
                                        }
                                    >
                                        -
                                    </button>
                                </SingleWord>
                            </ul>
                        )
                    })}
                </BoardFrame>
            </BoardFrame>
        </BoardFrame>
    )
}

export default MultipleWordGenerator

const SingleWord = styled.li`
    ${flexRow}
    justify-content: space-between;
`
