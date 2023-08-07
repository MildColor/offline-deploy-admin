import { ChangeEvent, useRef, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button, { ApplyButton } from '@components/common/Button/Button'
import { SearchInput } from '@components/common/Input/Input'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import { useModal } from '@hooks/common/Modal/useModal'
import { modal } from '@constants/modalTexts'
import UserRegistration from '@components/System/Modal/UserRegistration'
import { usersMutations, usersQueries } from '@hooks/queries/users'
import UserDetailManagement from '@components/System/Modal/UserDetailManagement'
import GridTable from '@components/common/GridTable/GridTable'
import { useDebounce } from '@hooks/common/useDebounce'
import { ColumnState } from 'ag-grid-community'

function UserManagement() {
    const columnDefs = [
        { headerName: '아이디', field: 'id' },
        { headerName: '이메일', field: 'email' },
        { headerName: '실명', field: 'username' },
        { headerName: '상태', field: 'status' },
        { headerName: '마지막 로그인', field: 'loginAt' },
    ]

    const { openModal } = useModal()

    const selectedUsersRef = useRef<UserDetailType[]>([])
    const [queryStrings, setQueryStrings] = useState<ListRequestType>({
        page: 0,
        sort: '',
        order: 'desc',
        search: '',
    })
    const debounceValue = useDebounce(queryStrings.search, 500)

    // 통신 로직
    const { data: users } = usersQueries.useGetUsers({
        ...queryStrings,
        search: debounceValue,
    })
    const { mutate: deleteUserMutate } = usersMutations.useDeleteUser()

    // handler
    const handleClickRegistration = () => {
        openModal(<UserRegistration />, { ...modal.System.UserRegistration })
    }

    const handleClickDelete = () => {
        const users = selectedUsersRef.current

        users.forEach((user, _) => {
            deleteUserMutate(user.userId)
        })
    }

    const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setQueryStrings({
            ...queryStrings,
            search: value,
        })
    }

    const handleSelectionChangedCallback = (selectedRows: UserDetailType[]) => {
        selectedUsersRef.current = selectedRows

        const userDetail = selectedRows?.[0]
        const selectedRowsLength = selectedRows.length

        if (selectedRowsLength === 1)
            openModal(<UserDetailManagement userDetail={userDetail} />, {
                ...modal.System.UserRegistration,
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
    const handleApply = () => {}

    return (
        <>
            <BoardFrame variant="bordered" height="90vh">
                <span className="caption">사용자 관리 설정</span>
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
                    rowData={users}
                    columnDefs={columnDefs}
                    rowSelection={'multiple'}
                    useCheckBox={true}
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

export default UserManagement
