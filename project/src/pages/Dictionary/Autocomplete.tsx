import React, { ChangeEvent, useRef, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button, { ApplyButton } from '@components/common/Button/Button'
import { SearchInput } from '@components/common/Input/Input'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import {
    autocompeleteMutations,
    autocompeleteQueries,
} from '@hooks/queries/autocomplete'
import GridTable from '@components/common/GridTable/GridTable'
import { useDebounce } from '@hooks/common/useDebounce'
import RegisterAutocompleteKeyword from '@components/Dictionary/Modal/RegisterAutocompleteKeyword'
import { modal } from '@constants/modalTexts'
import { useModal } from '@hooks/common/Modal/useModal'
import { ColumnState } from 'ag-grid-community'
import AutocompleteKeywordDetailManagement from '@components/Dictionary/Modal/AutocompleteKeywordDetailManagement'

function Autocomplete() {
    const columnDefs = [
        { headerName: '아이디', field: 'autoFixDictId' },
        { headerName: '키워드', field: 'keyword' },
        { headerName: '반영여부', field: 'reflectAct' },
        { headerName: '가중치', field: 'weightedVal' },
        { headerName: '생성일자', field: 'createdAt' },
        { headerName: '작성자', field: 'username' },
    ]
    // hooks
    const { openModal } = useModal()

    const selectedAutoCompleteTermsRef = useRef<AutoCompleteTermType[]>([])

    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,
        sort: 'autoFixDictId',
        order: 'desc',
        search: '',
    })

    const debounceValue = useDebounce(queryStrings.search, 500)

    // 통신
    const { data: autocompleteTerms } =
        autocompeleteQueries.useGetAutocompleteTerms({
            ...queryStrings,
            search: debounceValue,
        })

    const { mutate: deleteAutoCompleteMutation } =
        autocompeleteMutations.useDeleteAutocompleteTerms()

    // handler
    const handleClickRegistration = () => {
        openModal(<RegisterAutocompleteKeyword />, {
            ...modal.Dictionary.RegisterAutocompleteKeyword,
        })
    }

    const handleClickDelete = () => {
        const selectedAutoCompleteTerms = selectedAutoCompleteTermsRef.current

        selectedAutoCompleteTerms.forEach((autoTerms, _) => {
            deleteAutoCompleteMutation(autoTerms.autoFixDictId)
        })
    }

    const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setQueryStrings({
            ...queryStrings,
            [name]: value,
        })
    }

    const handleSelectionChangedCallback = (
        selectedRows: AutoCompleteTermType[]
    ) => {
        selectedAutoCompleteTermsRef.current = selectedRows
        const autoTermDetail = selectedRows?.[0]
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1)
            openModal(
                <AutocompleteKeywordDetailManagement
                    autoCompleteTermDetail={autoTermDetail}
                />,
                {
                    ...modal.Dictionary.AutocompleteKeywordDetailManagement,
                }
            )
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
    const handleApply = () => {}

    return (
        <>
            <BoardFrame variant="bordered" height="90vh">
                <span className="caption">자동 완성</span>
                <BoardFrame
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="0.5rem 0"
                >
                    <SearchInput
                        width="30rem"
                        onChange={handleChangeSearchInput}
                        name="search"
                    />
                    <div>
                        <Button
                            variant="normal"
                            onClick={handleClickRegistration}
                        >
                            등록
                        </Button>
                        <Button variant="normal" onClick={handleClickDelete}>
                            삭제
                        </Button>
                    </div>
                </BoardFrame>

                <GridTable
                    rowData={autocompleteTerms?.items}
                    columnDefs={columnDefs}
                    useCheckBox={true}
                    rowSelection={'multiple'}
                    onSelectionChangedCallback={handleSelectionChangedCallback}
                    onSortChangedCallback={handleSortChangedCallback}
                />

                <PaginationBox
                    page={queryStrings.page || 0}
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

export default Autocomplete
