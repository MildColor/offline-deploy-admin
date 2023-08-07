import { BoardFrame } from '@components/common/Board/Board'
import { ApplyButton } from '@components/common/Button/Button'
import LineChart from '@components/common/Chart/LineChart'
import DateRangePicker from '@components/common/DateSelector/DateRangePicker'
import DateSelectBox from '@components/common/SelectBox/Date/DateSelectBox'
import DataTable from '@components/common/Table/DataTable'
// import ReactTable from '@components/common/Table/ReactTable/ReactTable'
import { headers, items } from '@constants/dummyDatas'
import { statisticsQueries } from '@hooks/queries/statistic'
import generateDateOptions from '@utils/generateDateOptions'
import React, { useRef } from 'react'
import { labels, datasets } from '@constants/dummyDatas'
import { ellipsis } from '@styles/font'
import styled from 'styled-components'
import { flexCenter, flexColumn, flexRow } from '@styles/mixins'

const 기간별검색추이 = [
    { '2022/06/01': 321 },
    { '2022/06/02': 765 },
    { '2022/06/03': 543 },
    { '2022/06/04': 234 },
    { '2022/06/05': 765 },
    { '2022/06/06': 345 },
    { '2022/06/07': 234 },
    { '2022/06/08': 123 },
    { '2022/06/01': 876 },
    { '2022/06/10': 493 },
]

function SearchTrend() {
    const selectDateRange = useRef<string | undefined>('')
    const selectBoxOptions = generateDateOptions(4)
    const objEntriesArr = 기간별검색추이.map((v, i) => {
        const objEntires = Object.entries(v)
        return objEntires
    })

    const tableHeader = ['날짜', '쿼리수']

    // 쿼리 훅
    const { data: searchTrend } = statisticsQueries.useGetSearchTrend({
        from: String(new Date()),
        to: String(new Date()),
    })
    // 핸들러
    const handleApply = () => {}

    return (
        <>
            <BoardFrame alignItems="center">
                <DateSelectBox
                    options={selectBoxOptions}
                    selectDateRange={selectDateRange.current}
                />
                <DateRangePicker />
            </BoardFrame>
            <BoardFrame
                variant="bordered"
                margin="1rem 0"
                height="50rem"
                alignItems="center"
                justifyContent="center"
            >
                <LineChart
                    title="기간별 검색 추이 그래프"
                    data={{ labels, datasets }}
                />
            </BoardFrame>
            <BoardFrame variant="bordered">
                <div className="caption">기간별 검색 추이 상세</div>
                <ListWrapper>
                    <ListHeader>
                        {tableHeader.map((v, i) => {
                            return <HeaderSpan key={i}>{v}</HeaderSpan>
                        })}
                    </ListHeader>

                    <Ul>
                        {objEntriesArr.map((v, idx) => {
                            return (
                                <Li key={idx}>
                                    <>
                                        <Span>{v[0]}</Span>
                                        <Span>{v[1]}</Span>
                                    </>
                                </Li>
                            )
                        })}
                    </Ul>
                </ListWrapper>
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

export default SearchTrend

const ListWrapper = styled.div`
    ${flexRow}
    width: 100%;
    height: 100%;
`
const ListHeader = styled.div`
    ${flexColumn}
    height: 16rem;
    width: 8rem;
    background-color: ${({ theme }) => theme.colors.gray[0]};
`

const Ul = styled.ul`
    ${flexRow}
`

const Li = styled.li`
    ${flexColumn}
    height: 32rem;
    display: flex;
    align-items: center;
`

const HeaderSpan = styled.span`
    ${flexCenter}
    flex: 1;
`

const Span = styled.span`
    height: 16rem;
    ${flexCenter}

    ${ellipsis(1)}
`
