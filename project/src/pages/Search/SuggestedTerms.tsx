import EditingRecommendedSearchTerms from '@components/Search/Modal/EditingRecommendedSearchTerms'
import RegisterRecommendedSearchTerms from '@components/Search/Modal/RegisterRecommendedSearchTerms'
import { BoardFrame } from '@components/common/Board/Board'
import Button, { ApplyButton } from '@components/common/Button/Button'
import GridTable from '@components/common/GridTable/GridTable'
import { SearchInput } from '@components/common/Input/Input'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { modal } from '@constants/modalTexts'
import { useModal } from '@hooks/common/Modal/useModal'
import { useDebounce } from '@hooks/common/useDebounce'
// import { useModal } from '@hooks/common/Modal/useModal'
import { suggestedTermsQueries } from '@hooks/queries/suggestedTerms'
import { ColumnState } from 'ag-grid-community'
import React, { ChangeEvent, useRef, useState } from 'react'

function SuggestedTerms() {
    const columnDefs = [
        { headerName: 'ID', field: 'sgtWordId' },
        { headerName: '검색어', field: 'keyword' },
        { headerName: '추천 검색어', field: 'sgtWord' },
        { headerName: '반영여부', field: 'reflectAct' },
        { headerName: '작성자', field: 'username' },
        { headerName: '등록날짜', field: 'createdAt' },
    ]
    const { openModal } = useModal()

    const selectedTermsRef = useRef<SuggestedTermsDetailType[]>([]);
    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,                    // pagination
        sort: 'sgtWordId',      // sorted column
        order: 'desc',              // order: "desc" | "asc"
        search: '',                 // search input value
    })

    // Search handler
    const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setQueryStrings({
            ...queryStrings,
            search: value,
        })
    }
    const debounceValue = useDebounce(queryStrings.search, 500)
    const { data: suggestedTerms } = suggestedTermsQueries.useGetSuggestedTerms({
        ...queryStrings,
        search: debounceValue,
    })

    // GridTable handler
    const handleSelectionChangedCallback = (selectedRows: SuggestedTermsDetailType[]) => {
        selectedTermsRef.current = selectedRows

        const termDetail = selectedRows?.[0]
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1)
            openModal(<EditingRecommendedSearchTerms termDetail={termDetail}/>, { 
                ...modal.Search.EditingRecommendedSearchTerms 
            })
    }

    const handleSortChangedCallback = (sortedColumns: ColumnState[]) => {
        if (sortedColumns.length === 0) return

        const { colId, sort } = sortedColumns[0]
        colId &&
            sort &&
            setQueryStrings({
                ...queryStrings,
                sort: colId,
                order: sort,
            })
    }

    // buttons
    const handleClickRegistration = () => {
        openModal(<RegisterRecommendedSearchTerms/>, {
            ...modal.Search.RegisterRecommendedSearchTerms,
        })
    }

    const handleApply = () => {}

    return (
        <>
            <BoardFrame variant="bordered" height="90vh" direction="column">
                <span className="caption">추천 검색어</span>
                <BoardFrame
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="0.5rem 0"
                >
                    <SearchInput 
                        width="30rem"
                        onChange={handleChangeSearchInput} 
                    />
                    <Button variant="normal" onClick={handleClickRegistration}>
                        등록
                    </Button>
                </BoardFrame>

                {/* <DataTable headers={headers} items={items}></DataTable> */}
                {/* <List data={recomendDatas.search_popular_first} /> */}

                <GridTable
                    rowData={suggestedTerms}
                    columnDefs={columnDefs}
                    rowSelection={'multiple'}
                    onSelectionChangedCallback={handleSelectionChangedCallback}
                    onSortChangedCallback={handleSortChangedCallback}
                />

                <PaginationBox
                    page={queryStrings.page ?? 0}
                    setPage={setQueryStrings}
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

export default SuggestedTerms