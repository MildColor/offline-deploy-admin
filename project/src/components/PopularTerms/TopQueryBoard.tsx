import { BoardFrame } from '@components/common/Board/Board'
import DateSelectBox from '@components/common/SelectBox/Date/DateSelectBox'
import DataTable from '@components/common/Table/DataTable'
import { popularHeaders, popularItems } from '@constants/dummyDatas'
import { statisticsQueries } from '@hooks/queries/statistic'
import generateDateOptions from '@utils/generateDateOptions'
import React, { useRef, useState } from 'react'

function TopQueryBoard() {
    const selectDateRange = useRef<string | undefined>('')
    const [topQueryQueryStrings, setTopQueryQueryStrings] = useState({
        from: '',
        to: '',
    })

    const { data: topQuery } = statisticsQueries.useGetTopQuery({
        from: topQueryQueryStrings.from,
        to: topQueryQueryStrings.to,
    })

    const selectBoxOptions = generateDateOptions(4)

    return (
        <BoardFrame width="20%" variant="bordered" direction="column">
            <span className="caption">인기 검색어</span>
            <DateSelectBox options={selectBoxOptions} />
            <DataTable headers={popularHeaders} items={popularItems} />
        </BoardFrame>
    )
}

export default TopQueryBoard
