import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import GridTable from '@components/common/GridTable/GridTable'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { modal } from '@constants/modalTexts'
import { useModal } from '@hooks/common/Modal/useModal'
import { useDebounce } from '@hooks/common/useDebounce'
import { dictionaryQueries } from '@hooks/queries/dictionary'
import { ColumnState } from 'ag-grid-community'
import React, { useRef, useState } from 'react'
import RegisterSynonymTerms from './Modal/RegisterSynonymTerms'
import SynonymDetailedManagement from './Modal/SynonymDetailedManagement'

function SynonymDictionaryBoard({ search }: { search: string }) {
    const columnDefs = [
        { headerName: '아이디', field: 'synomDictId' },
        { headerName: '단어', field: 'keyword' },
        { headerName: '등록단어', field: 'synomWord' },
        { headerName: '작성자', field: 'createrName' },
        { headerName: '등록날짜', field: 'createdAt' },
    ]
    const { openModal } = useModal()
    const selectedUsersRef = useRef<SynonymDictionaryType[]>([])
    const [queryStrings, setQueryStrings] = useState({
        search: '',
        page: 0,
    })
    const debounceValue = useDebounce(search, 500)

    const { data: synonyms } = dictionaryQueries.useGetSynonymDictionary({
        ...queryStrings,
        search: debounceValue,
    })

    console.log('synonyms', synonyms)

    const handleClickSynonymRegistration = () => {
        openModal(<RegisterSynonymTerms />, {
            ...modal.Dictionary.RegisterSynonymTerms,
        })
    }

    const handleSelectionChangedCallback = (
        selectedRows: SynonymDictionaryType[]
    ) => {
        selectedUsersRef.current = selectedRows

        const synonymDetail = selectedRows?.[0]
        const selectedRowsLength = selectedRows.length

        console.log('synonymDetail', synonymDetail)

        if (selectedRowsLength === 1)
            openModal(
                <SynonymDetailedManagement synonymDetail={synonymDetail} />,
                {
                    ...modal.Dictionary.SynonymDetailedManagement,
                }
            )
    }
    // const handleSortChangedCallback = (sortedColumns: ColumnState[]) => {}

    return (
        <BoardFrame variant="bordered" width="33%">
            <BoardFrame
                alignItems="center"
                justifyContent="space-between"
                margin="0.5rem 0"
            >
                <div className="caption">동의어 관리</div>
                <Button
                    variant="normal"
                    onClick={handleClickSynonymRegistration}
                >
                    등록
                </Button>
            </BoardFrame>
            <BoardFrame
                alignItems="center"
                justifyContent="space-between"
                direction="column"
                height="100%"
            >
                <GridTable
                    rowData={synonyms?.items}
                    columnDefs={columnDefs}
                    rowSelection={'single'}
                    onSelectionChangedCallback={handleSelectionChangedCallback}
                    // onSortChangedCallback={handleSortChangedCallback}
                />
                <PaginationBox
                    page={queryStrings.page || 0}
                    setPage={setQueryStrings}
                />
            </BoardFrame>
        </BoardFrame>
    )
}

export default SynonymDictionaryBoard
