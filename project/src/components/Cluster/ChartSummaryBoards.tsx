import React from 'react'
import LineChart from '@components/common/Chart/LineChart'
import { BoardFrame } from '@components/common/Board/Board'
import { clusterQueries } from '@hooks/queries/cluster'
import { labels, datasets } from '@constants/dummyDatas'

function ChartSummaryBoards() {
    const {
        useGetClusterSearchRate,
        useGetClusterIndexingRate,
        useGetClusterSearchLatency,
        useGetClusterIndexingLatency,
    } = clusterQueries

    const { data: searchRate } = useGetClusterSearchRate()
    const { data: indexingRate } = useGetClusterIndexingRate()
    const { data: searchLatency } = useGetClusterSearchLatency()
    const { data: indexingLatency } = useGetClusterIndexingLatency()

    const IndexingRate = [
        ...datasets,
        {
            label: 'Indexing Rate',
            data: [432, 348, 129, 485, 32, 999, 332, 281, 84, 329, 777],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ]

    return (
        <BoardFrame
            margin="1rem 0"
            justifyContent="space-between"
            height="75vh"
        >
            <BoardFrame width="49.7%" direction="column" margin="0">
                <BoardFrame
                    variant="bordered"
                    margin="0.5rem 0"
                    alignItems="center"
                    height="49%"
                >
                    <LineChart
                        title="Search Rate(/s)"
                        data={{ labels, datasets }}
                    />
                </BoardFrame>
                <BoardFrame
                    variant="bordered"
                    margin="0.5rem 0"
                    alignItems="center"
                    height="49%"
                >
                    <LineChart
                        title="Indexing Rate(/s)"
                        data={{ labels, datasets: IndexingRate }}
                    />
                </BoardFrame>
            </BoardFrame>
            <BoardFrame width="49.7%" direction="column" margin="0">
                <BoardFrame
                    variant="bordered"
                    margin="0.5rem 0"
                    alignItems="center"
                    height="49%"
                >
                    <LineChart
                        title="Search Latency(ms)"
                        data={{ labels, datasets }}
                    />
                </BoardFrame>
                <BoardFrame
                    variant="bordered"
                    margin="0.5rem 0"
                    alignItems="center"
                    height="49%"
                >
                    <LineChart
                        title="Indexing Latency(ms)"
                        data={{ labels, datasets }}
                    />
                </BoardFrame>
            </BoardFrame>
        </BoardFrame>
    )
}

export default ChartSummaryBoards
