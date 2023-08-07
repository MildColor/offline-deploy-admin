import { BoardFrame } from '@components/common/Board/Board'
import DataTable from '@components/common/Table/DataTable'
import { headers, items } from '@constants/dummyDatas'
import { clusterQueries } from '@hooks/queries/cluster'
import React from 'react'

function StatusBoard() {
    const { data: clusterTotal } = clusterQueries.useGetClusterTotal()
    return (
        <>
            <BoardFrame variant="bordered">
                <DataTable headers={headers} items={items} variant="cluster" />
            </BoardFrame>
        </>
    )
}

export default StatusBoard
