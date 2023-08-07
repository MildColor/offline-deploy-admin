import React, { useRef } from 'react'

import { BoardFrame } from '@components/common/Board/Board'
import DateRangePicker from '@components/common/DateSelector/DateRangePicker'
import DateSelectBox from '@components/common/SelectBox/Date/DateSelectBox'
import DataTable from '@components/common/Table/DataTable'
import { popularHeaders, popularItems } from '@constants/dummyDatas'
import generateDateOptions from '@utils/generateDateOptions'
import BarChart from '@components/common/Chart/BarChart'
import { ApplyButton } from '@components/common/Button/Button'
import { statisticsQueries } from '@hooks/queries/statistic'

function SearchTermStatistic() {
    const selectDateRange = useRef<string | undefined>('')
    console.log('SearchTrend' + selectDateRange)

    const selectBoxOptions = generateDateOptions(4)

    const { useGetSearchTrend, useGetTopQuery, useGetZeroQuery } =
        statisticsQueries

    const from = String(new Date())
    const to = String(new Date())

    const { data: searchTrend } = useGetSearchTrend({ from, to })
    const { data: topQuery } = useGetTopQuery({ from, to })
    const { data: zeroQuery } = useGetZeroQuery({ from, to })

    const handleApply = () => {}

    const queries = [
        { WBCasd: 2212 },
        { AfdDSS: 1223 },
        { WdfBC: 2142 },
        { ADSdS: 1243 },
        { WBdsC: 2182 },
        { ADSasdS: 16723 },
        { esdS: 1623 },
        { fmkldS: 1623 },
        { dlks: 9723 },
    ]

    const entriesQueries = queries.map((v, i) => {
        let objKey = Object.keys(v)
        let newObj: { [key: string]: string | number | undefined } = { ...v }
        newObj['label'] = objKey[0]
        return newObj
    })

    console.log(entriesQueries)
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
                <BarChart />
            </BoardFrame>
            <BoardFrame margin="0" width="100%" justifyContent="space-between">
                <BoardFrame width="49.5%" variant="bordered">
                    <div className="caption">Top Query</div>
                    <DataTable headers={popularHeaders} items={popularItems} />
                </BoardFrame>
                <BoardFrame width="49.5%" variant="bordered">
                    <div className="caption">Zero Query</div>
                    <DataTable headers={popularHeaders} items={popularItems} />
                </BoardFrame>
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

export default SearchTermStatistic
