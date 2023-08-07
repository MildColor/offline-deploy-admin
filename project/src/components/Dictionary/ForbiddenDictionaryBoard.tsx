import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import GridTable from '@components/common/GridTable/GridTable'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { useModal } from '@hooks/common/Modal/useModal'
import { useDebounce } from '@hooks/common/useDebounce'
import { dictionaryQueries } from '@hooks/queries/dictionary'
import React, { useRef, useState } from 'react'
import RegisterForbiddenTerms from './Modal/RegisterForbiddenTerms'
import { modal } from '@constants/modalTexts'
import ForbiddenTermsDetailManagement from './Modal/ForbiddenTermsDetailManagement'

function ForbiddenDictionaryBoard({ search }: { search: string }) {
    const columnDefs = [
        { headerName: '아이디', field: 'stwdDictId' },
        { headerName: '단어', field: 'keyword' },
        { headerName: '작성자', field: 'createrName' },
        { headerName: '등록날짜', field: 'createdAt' },
    ]

    const { openModal } = useModal()
    const selectedTermsRef = useRef<StopwordDictionaryType[]>([])

    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,
        search: '',
    })

    const debounceValue = useDebounce(search, 500)

    const { data: forbiddenDictionary } =
        dictionaryQueries.useGetForbiddenDictionary({
            ...queryStrings,
            search: debounceValue,
        })

    const onClickRegisterStopWordDict = () => {
        openModal(<RegisterForbiddenTerms />, {
            ...modal.Dictionary.RegisterForbiddenTerms,
        })
    }

    const handleSelectionChangedCallback = (
        selectedRows: StopwordDictionaryType[]
    ) => {
        selectedTermsRef.current = selectedRows
        const detail = selectedRows?.[0]
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1) {
            openModal(
                <ForbiddenTermsDetailManagement stopwordDetail={detail} />,
                {
                    ...modal.Dictionary.ForbiddenTermsDetailManagement,
                }
            )
        }
    }

    return (
        <BoardFrame variant="bordered" width="33%">
            <BoardFrame
                alignItems="center"
                justifyContent="space-between"
                margin="0.5rem 0"
            >
                <div className="caption">금칙어 관리</div>
                <Button variant="normal" onClick={onClickRegisterStopWordDict}>
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
                    rowData={forbiddenDictionary?.items}
                    columnDefs={columnDefs}
                    useCheckBox={false}
                    onSelectionChangedCallback={handleSelectionChangedCallback}
                    // onSortChangedCallback={handleSortChangedCallback}
                    // useSmallTable={true}
                    rowSelection={'single'}
                />

                <PaginationBox
                    page={queryStrings.page || 0}
                    setPage={setQueryStrings}
                />
            </BoardFrame>
        </BoardFrame>
    )
}

export default ForbiddenDictionaryBoard
