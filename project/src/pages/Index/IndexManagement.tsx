import { BoardFrame } from '@components/common/Board/Board'
import Button, { ApplyButton } from '@components/common/Button/Button'
import { SearchInput } from '@components/common/Input/Input'
import List from '@components/common/List/List'
import PaginationBox from '@components/common/Pagination/PaginationBox'
import TabMenu from '@components/common/TabMenu/TabMenu'
import DataTable from '@components/common/Table/DataTable'
import { headers, items, listDatas } from '@constants/dummyDatas'
import { PAGE_PATH } from '@constants/path'
import { IndexTabItems } from '@constants/tabItems'
import useOutsideClick from '@hooks/common/Modal/useOutsideClick'
import { indicesQueries } from '@hooks/queries/indices'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { flexCenter } from '@styles/mixins'
import { useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function IndexManagement() {
    const navigate = useNavigate()
    const sideBarOutsidRef = useRef<HTMLDivElement | null>(null)
    const [sidebarState, setSidbarState] = useState(false)

    useOutsideClick({
        ref: sideBarOutsidRef,
        callback: () => {
            setSidbarState(false)
        },
    })

    // const [indexId, setIndexId] = useState<string | number>(0)

    const { useGetIndices, useGetIndicesDetail } = indicesQueries
    const [indicesQueryStrings, setIndicesQueryStrings] = useState({
        search: '',
        page: 1,
    })
    const [indicesDetailQueryString, setIndicesDetailQueryString] = useState('')

    const { data: indices } = useGetIndices(indicesQueryStrings)
    const { data: indicesDetail } = useGetIndicesDetail(
        indicesDetailQueryString
    )

    const onClickRegister = () => {}

    const onClickItem = (id: string | number | undefined) => {
        navigate(
            '/' +
                PAGE_PATH.INDEX +
                '/' +
                PAGE_PATH.MANAGEMENT_QUERY(id) +
                '/' +
                PAGE_PATH.SUMMARY
            // '/' +
            // PAGE_PATH.SUMMARY
        )

        setSidbarState(true)
    }

    const handleApply = () => {}

    return (
        <>
            <BoardFrame variant="bordered" height="90vh">
                <span className="caption">인덱스 정보</span>
                <BoardFrame
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="0.5rem 0"
                >
                    <SearchInput width="30rem" />
                    <Button variant="normal" onClick={onClickRegister}>
                        등록
                    </Button>
                </BoardFrame>
                <DataTable
                    headers={headers}
                    items={items}
                    onClick={(id) => onClickItem(id)}
                />
                {/* <List data={listDatas.search_popular_first} /> */}

                <PaginationBox
                    page={indicesQueryStrings.page}
                    setPage={setIndicesQueryStrings}
                />
            </BoardFrame>
            <BoardFrame
                alignItems="center"
                justifyContent="flex-end"
                margin="0.5rem 0"
            >
                <ApplyButton onClick={handleApply}>새로고침</ApplyButton>
            </BoardFrame>

            {sidebarState && (
                <SidebarBackground ref={sideBarOutsidRef}>
                    <SidebarBody>
                        <div className="title">article</div>
                        <TabMenu tabItems={IndexTabItems} />
                        <Outlet></Outlet>
                    </SidebarBody>
                </SidebarBackground>
            )}
        </>
    )
}

export default IndexManagement

const SidebarBackground = styled.div`
    position: fixed;
    ${flexCenter}
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
`

const SidebarBody = styled.div`
    position: fixed;
    top: 0;
    left: auto;
    right: 0;
    height: 100vh;
    width: 40%;
    transform: translate(0%, 0%);
    border-radius: 0;
    background-color: white;
    padding: 1rem;
    .title {
        ${getTypographyStyles(TYPOGRAPHY_STYLES.Headline1_B)}
        margin: 1rem 0;
    }
`
