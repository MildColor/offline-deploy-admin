import TypoCorrectionKeywordDetailManagement from '@components/Dictionary/Modal/TypoCorrectionKeywordDetailManagement'
import TypoCorrectionKeywordRegistration from '@components/Dictionary/Modal/TypoCorrectionKeywordRegistration'
import { BoardFrame } from '@components/common/Board/Board'
import Button, { ApplyButton } from '@components/common/Button/Button'
import GridTable from '@components/common/GridTable/GridTable'
import { SearchInput } from '@components/common/Input/Input'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { modal } from '@constants/modalTexts'
import { useModal } from '@hooks/common/Modal/useModal'
import { useDebounce } from '@hooks/common/useDebounce'
import { typoCorrectionMutations, typoCorrectionQueries } from '@hooks/queries/typoCorrection'
import { ColumnState } from 'ag-grid-community'
// import { useModal } from '@hooks/common/Modal/useModal'
import React, { ChangeEvent, useRef, useState } from 'react'

function TypoCorrection() {
    const columnDefs = [
        { headerName: 'ID', field: 'autoFixDictId', sortable: false, },
        { headerName: '키워드', field: 'keyword' },
        { headerName: '오타교정 키워드 명', field: 'trfKeyword', sortable: false, },
        { headerName: '반영여부', field: 'reflectAct' },
        { headerName: '가중치', field: 'weightedVal' },
        { headerName: '등록날짜', field: 'createdAt', sortable: false, },
        { headerName: '작성자', field: 'username', sortable: false, },
    ]

    const { openModal } = useModal();

    const selectedTyposRef = useRef<TypoCorrectionDetail[]>([])
    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,                    // pagination
        sort: 'autoFixDictId',      // sorted column
        order: 'desc',              // order: "desc" | "asc"
        search: '',                 // search input value
    })

    // 검색어 handle
    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setQueryStrings({
            ...queryStrings,
            search: value,
        })
    }

    const debounceValue = useDebounce(queryStrings.search, 500)
    const { data: typos } = typoCorrectionQueries.useGetTypoCorreciton({
        // TODO: sort와 order가 동시에 바뀌니까 네트워크 요청이 4개씩 간다. 최적화 방법 고민해보기.
        ...queryStrings,
        search: debounceValue,
    })

    // Table Handler
    const handleSelectionChangedCallback = (selectedRows: TypoCorrectionDetail[]) => {
        selectedTyposRef.current = selectedRows;
        
        const tcDetail = selectedRows?.[0];
        const selectedRowsLength = selectedRows.length;

        if(selectedRowsLength === 1)
            openModal(<TypoCorrectionKeywordDetailManagement tcDetail={tcDetail}/>, {
                ...modal.Dictionary.TypoCorrectionKeywordDetailManagement,
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
    const onClickRegister = () => {
        openModal(<TypoCorrectionKeywordRegistration />, { ...modal.Dictionary.TypoCorrectionKeywordRegistration })
    }

    const { mutate: deleteTyposMutation } = typoCorrectionMutations.useDeleteTypoCorreciton();
    const onClickDelete = () => {
        const typos = selectedTyposRef.current;

        typos.forEach((typo, _) => {
            deleteTyposMutation(typo.autoFixDictId);
        })
    }

    const handleApply = () => {}

    return (
        <>
            <BoardFrame variant="bordered" height="90vh">
                <span className="caption">오타 교정</span>
                <BoardFrame
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="0.5rem 0"
                >
                    <SearchInput 
                        width="30rem" 
                        onChange={onChangeSearchInput}
                    />
                    <div>
                        <Button variant="normal" onClick={onClickRegister}>
                            등록
                        </Button>
                        <Button variant="normal" onClick={onClickDelete}>
                            삭제
                        </Button>
                    </div>
                </BoardFrame>
                {/* <DataTable headers={headers} items={items} /> */}
                {/* <List data={dictDatas.search_popular_first} /> */}
                <GridTable 
                    rowData={typos}
                    useCheckBox={true}
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

export default TypoCorrection
