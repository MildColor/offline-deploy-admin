import EditingOverridingSearchTerms from '@components/Search/Modal/EditingOverridingSearchTerms'
import RegisterOverridingSearchTerms from '@components/Search/Modal/RegisterOverridingSearchTerms'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import GridTable from '@components/common/GridTable/GridTable'
import { SearchInput } from '@components/common/Input/Input'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { modal } from '@constants/modalTexts'
import { useModal } from '@hooks/common/Modal/useModal'
import { useDebounce } from '@hooks/common/useDebounce'
import { popularTermsQueries } from '@hooks/queries/popularTerms'
import { ColumnState } from 'ag-grid-community'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

function OverridingSearchTermsBoard() {
    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: '단어', field: 'keyword' },
        { headerName: '순위', field: 'rank' },
        { headerName: '작성자', field: 'username' },
        { headerName: '등록날짜', field: 'createdAt' },
    ]
    const { openModal } = useModal()

    const selectedTermsRef = useRef<OverridingSearchTermDetail[]>([]);
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
    const { data: overridingTerms } = popularTermsQueries.useGetOverridingSearchTerms({
        ...queryStrings,
        search: debounceValue,
    })

    // GridTable handler
    const handleSelectionChangedCallback = (selectedRows: OverridingSearchTermDetail[]) => {
        selectedTermsRef.current = selectedRows

        const detail = selectedRows?.[0];
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1)
            openModal(<EditingOverridingSearchTerms detail={detail}/>, { 
                ...modal.Search.EditingOverridingSearchTerms 
            })
    }

    // buttons
    const handleClickRegistration = () => {
        openModal(<RegisterOverridingSearchTerms/>, {
            ...modal.Search.RegisterOverridingSearchTerms,
        })
    }

    const handleApply = () => {}

    return (
        <BoardFrame variant="bordered" margin="0" height="50%">
            <BoardFrame
                alignItems="center"
                justifyContent="space-between"
                margin="0.5rem 0"
            >
                <span className="caption">우선 적용 검색어</span>
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
                rowData={overridingTerms}
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

export default OverridingSearchTermsBoard
