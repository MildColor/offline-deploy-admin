import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { ellipsis } from '@styles/font'
import { flexCenter, flexColumn } from '@styles/mixins'
import { SearchInput } from '@components/common/Input/Input'
import Button, { ApplyButton } from '@components/common/Button/Button'
import { BoardFrame } from '@components/common/Board/Board'
import {
    searchRankMutations,
    searchRankQueries,
} from '@hooks/queries/searchRank'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { useDebounce } from '@hooks/common/useDebounce'
import { data } from '@constants/dummyDatas'

function CategoryBoosting() {
    const header = Object.keys(data[0])
    const filteredHeader = header.filter((h) => h !== 'hide' && h !== 'high')

    const [categoryBoostingQueryStrings, setCategoryBoostingQueryStrings] =
        useState({
            search: '',
            page: 1,
        })
    const searchTerm = useDebounce(categoryBoostingQueryStrings.search, 500)

    // search hooks
    const { data: rank } = searchRankQueries.useGetRank({
        page: categoryBoostingQueryStrings.page,
        search: searchTerm,
    })
    const { mutate: searchRankHideMutate } =
        searchRankMutations.useUpdateRankHide()

    const { mutate: searchRankHighMutate } =
        searchRankMutations.useUpdateRankHide()

    const { mutate: searchRankUpdateMutate } =
        searchRankMutations.usePostRankUpdate()

    // handler fn
    const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setCategoryBoostingQueryStrings({
            ...categoryBoostingQueryStrings,
            search: value,
        })
    }

    const handleClickHideBtn = (index_name: string, isHide: boolean) => {
        searchRankHideMutate({ docId: index_name, hide: !isHide })
    }

    const handleClickHighBtn = (index_name: string, isHigh: boolean) => {
        searchRankHighMutate({ docId: index_name, high: !isHigh })
    }

    const handleApply = () => {
        searchRankUpdateMutate()
    }

    return (
        <>
            <BoardFrame variant="bordered" height="90vh" direction="column">
                <span className="caption">카테고리 부스팅</span>
                <BoardFrame
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="0.5rem 0"
                >
                    <SearchInput
                        width="30rem"
                        name="search"
                        onChange={handleChangeSearchInput}
                    />
                </BoardFrame>
                {/* <DataTable headers={headers} items={items} /> */}
                <ListWrapper>
                    <ListHeader>
                        {filteredHeader.map((v, i) => (
                            <span key={i}>{v}</span>
                        ))}
                    </ListHeader>

                    <Ul>
                        {data.map((v, _) => (
                            <Li key={v.index_name}>
                                {filteredHeader.map((categoryString, _) => {
                                    let str: string = ''
                                    categoryString === 'source'
                                        ? (str = JSON.stringify(
                                              v[categoryString]
                                          ))
                                        : (str = v[categoryString])
                                    return <span>{str}</span>
                                })}
                                <ButtonWrapper>
                                    <Button
                                        data-name="hide"
                                        variant="normal"
                                        onClick={() =>
                                            handleClickHideBtn(
                                                v.source.DOCID,
                                                v.hide
                                            )
                                        }
                                    >
                                        {v.hide === true
                                            ? '숨기기 해제'
                                            : '숨기기'}
                                    </Button>
                                    <Button
                                        data-name="high"
                                        variant="normal"
                                        onClick={() =>
                                            handleClickHighBtn(
                                                v.source.DOCID,
                                                v.high
                                            )
                                        }
                                    >
                                        {v.high === true
                                            ? '상위 고정해제'
                                            : '상위 고정'}
                                    </Button>
                                </ButtonWrapper>
                            </Li>
                        ))}
                    </Ul>
                </ListWrapper>

                <PaginationBox
                    page={categoryBoostingQueryStrings.page}
                    setPage={setCategoryBoostingQueryStrings}
                />
            </BoardFrame>
            <BoardFrame
                alignItems="center"
                justifyContent="flex-end"
                margin="0.5rem 0"
            >
                <ApplyButton onClick={handleApply}>새로고침</ApplyButton>
            </BoardFrame>
        </>
    )
}

export default CategoryBoosting

const ListWrapper = styled.div`
    width: 100%;
    height: 100%;
`

const ListHeader = styled.div`
    display: flex;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.gray[0]};
    align-items: center;

    & span {
        display: inline-block;
        text-align: center;
        ${ellipsis(1)}
        width: 10%;
    }

    span:nth-child(1) {
        width: 7rem;
    }

    span:nth-child(2) {
        width: 20rem;
    }

    span:nth-child(3) {
        flex: 1;
    }
`

const Ul = styled.ul``

const Li = styled.li`
    height: 10rem;
    display: flex;
    align-items: center;

    & span {
        display: inline-block;
        text-align: center;
        ${ellipsis(3)}
        width: 20%;
    }

    span:nth-child(1) {
        width: 7rem;
    }

    span:nth-child(2) {
        width: 20rem;
    }

    span:nth-child(3) {
        flex-grow: 1;
    }
`

const ButtonWrapper = styled.div`
    ${flexColumn}
    ${flexCenter}
  justify-content: space-between;
    height: 100%;
    width: 15rem;
    padding: 1rem 0;
`
