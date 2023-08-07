import EditingHideSearchTerms from '@components/Search/Modal/EditingHideSearchTerms'
import RegisterHideSearchTerms from '@components/Search/Modal/RegisterHideSearchTerms'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import GridTable from '@components/common/GridTable/GridTable'
import { SearchInput } from '@components/common/Input/Input'
import List from '@components/common/List/List'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { listDatas } from '@constants/dummyDatas'
import { modal } from '@constants/modalTexts'
import { useModal } from '@hooks/common/Modal/useModal'
import { useDebounce } from '@hooks/common/useDebounce'
import { popularTermsQueries } from '@hooks/queries/popularTerms'
import { ColumnState } from 'ag-grid-community'
import React, { ChangeEvent, useRef, useState } from 'react'

function HideSearchTermsBoard() {
    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: '단어', field: 'keyword' },
        { headerName: '작성자', field: 'username' },
        { headerName: '등록날짜', field: 'createdAt' },
    ]
    const { openModal } = useModal()

    const selectedTermsRef = useRef<HideSearchTermDetail[]>([]);
    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,                    // pagination
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
    const { data: hideTerms } = popularTermsQueries.useGetHideSearchTerms({
        ...queryStrings,
        search: debounceValue,
    })

    // GridTable handler
    const handleSelectionChangedCallback = (selectedRows: HideSearchTermDetail[]) => {
        selectedTermsRef.current = selectedRows

        const detail = selectedRows?.[0];
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1)
            openModal(<EditingHideSearchTerms detail={detail}/>, { 
                ...modal.Search.EditingHideSearchTerms 
            })
    }

    // buttons
    const handleClickRegistration = () => {
        openModal(<RegisterHideSearchTerms/>, {
            ...modal.Search.RegisterHideSearchTerms,
        })
    }

    const handleApply = () => {}

    return (
        <BoardFrame variant="bordered" margin="0 0 0.5rem 0" height="50%">
            <BoardFrame
                alignItems="center"
                justifyContent="space-between"
                margin="0.5rem 0"
            >
                <span className="caption">제외 검색어</span>
                <BoardFrame alignItems="center" width="25rem" margin="0">
                    <SearchInput 
                        width="20rem" 
                        margin="0" 
                        onChange={handleChangeSearchInput}    
                    />
                    <Button variant="normal" onClick={handleClickRegistration}>
                        등록
                    </Button>
                </BoardFrame>
            </BoardFrame>

            <GridTable
                rowData={hideTerms}
                columnDefs={columnDefs}
                rowSelection={'single'}
                onSelectionChangedCallback={handleSelectionChangedCallback}
                useSmallTable={true}
            />

            <PaginationBox
                page={queryStrings.page ?? 0}
                setPage={setQueryStrings}
            />
        </BoardFrame>
    )
}

export default HideSearchTermsBoard
