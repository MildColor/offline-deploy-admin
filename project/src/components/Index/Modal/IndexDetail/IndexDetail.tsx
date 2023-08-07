import TabMenu from '@components/common/TabMenu/TabMenu'
import { IndexTabItems } from '@constants/tabItems'
import React from 'react'
import { Outlet } from 'react-router-dom'

function IndexDetail() {
    return (
        <>
            <TabMenu tabItems={IndexTabItems} />
            <Outlet />
        </>
    )
}

export default IndexDetail
