import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { modal } from '@constants/modalTexts'
import { dictionaryQueries } from '@hooks/queries/dictionary'
import React, { useRef, useState } from 'react'
import RegisterUserDictionaryTerms from './Modal/RegisterUserDictionaryTerms'
import { useModal } from '@hooks/common/Modal/useModal'
import Modal from '@components/common/Modal/Modal'
import GridTable from '@components/common/GridTable/GridTable'
import DetailUserDictionaryTerms from './Modal/DetailUserDictionaryTerms'
import { useDebounce } from '@hooks/common/useDebounce'

function UserDictionaryBoard({ search }: { search: string }) {
    const columnDefs = [
        { headerName: '아이디', field: 'customDictId' },
        { headerName: '단어', field: 'keyword' },
        { headerName: '등록단어', field: 'rgisWord' },
        { headerName: '작성자', field: 'createrName' },
        { headerName: '등록날짜', field: 'createdAt' },
    ]

    const { openModal } = useModal()
    const selectedTermsRef = useRef<UserDictionaryType[]>([])

    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,
        sort: '',
        order: 'desc',
        search: '',
    })

    const debounceValue = useDebounce(search, 500)

    const { data: userDictionary } = dictionaryQueries.useGetUserDicitonary({
        ...queryStrings,
        search: debounceValue,
    })

    const onClickRegisterUserDict = () => {
        openModal(<RegisterUserDictionaryTerms />, {
            ...modal.Dictionary.RegisterUserDictionaryTerms,
        })
    }

    const handleSelectionChangedCallback = (
        selectedRows: UserDictionaryType[]
    ) => {
        selectedTermsRef.current = selectedRows

        const detail = selectedRows?.[0]
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1) {
            openModal(
                <DetailUserDictionaryTerms userDictionaryDetail={detail} />,
                {
                    ...modal.Dictionary.DetailUserDictionaryTerms,
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
                <div className="caption">사용자 사전 관리</div>
                <Button variant="normal" onClick={onClickRegisterUserDict}>
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
                    rowData={userDictionary?.items}
                    columnDefs={columnDefs}
                    useCheckBox={false}
                    onSelectionChangedCallback={handleSelectionChangedCallback}
                    // onSortChangedCallback={handleSortChangedCallback}
                    rowSelection={'single'}
                />
                <PaginationBox
                    page={queryStrings.page || 0}
                    setPage={setQueryStrings}
                />
            </BoardFrame>
            <Modal />
        </BoardFrame>
    )
}

export default UserDictionaryBoard
