import React from 'react'
import StatusBoard from '@components/Cluster/StatusBoard'
import ChartSummaryBoards from '@components/Cluster/ChartSummaryBoards'
import { BoardFrame } from '@components/common/Board/Board'
import { ApplyButton } from '@components/common/Button/Button'

function Summary() {
    const handleApplyBtn = () => {
        console.log('summary')
    }
    return (
        <>
            <StatusBoard />
            <ChartSummaryBoards />
            <BoardFrame alignItems="center" justifyContent="flex-end">
                <ApplyButton onClick={handleApplyBtn}>새로고침</ApplyButton>
            </BoardFrame>
        </>
    )
}

export default Summary
