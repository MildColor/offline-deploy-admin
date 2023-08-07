import React from 'react'

import { BoardFrame } from '@components/common/Board/Board'
import LineChart from '@components/common/Chart/LineChart'
import DataTable from '@components/common/Table/DataTable'
import {
    headers,
    items,
    labels,
    popularHeaders,
    popularItems,
} from '@constants/dummyDatas'
import { clusterQueries } from '@hooks/queries/cluster'
import { statisticsQueries } from '@hooks/queries/statistic'
import { calculateDateRange, formatDate } from '@utils/generateDateOptions'

function DataSummaryBoards() {
    // const { data: clusterTotal } = clusterQueries.useGetClusterTotal()

    // 2주전 날짜 계산
    const { startDate, endDate } = calculateDateRange(new Date(), 2)

    const { data: searchTrend } = statisticsQueries.useGetSearchTrend({
        from: formatDate(startDate),
        to: formatDate(endDate),
    })

    console.log('searchTrend', searchTrend)
    return (
        <>
            <BoardFrame variant="bordered">
                <DataTable headers={headers} items={items} variant="cluster" />
            </BoardFrame>
            <BoardFrame
                margin="1rem 0"
                justifyContent="space-between"
                height="60vh"
            >
                <BoardFrame variant="bordered" width="23%">
                    <span className="caption">인기 검색어</span>

                    <DataTable headers={popularHeaders} items={popularItems} />
                </BoardFrame>
                <BoardFrame variant="bordered" width="76%" alignItems="center">
                    <LineChart
                        title="검색 추이"
                        data={searchTrend ?? { labels: [], datasets: [] }}
                    />
                </BoardFrame>
            </BoardFrame>
        </>
    )
}

export default DataSummaryBoards
