import { TabItem } from '@constants/tabItems'
import React, { useState } from 'react'
import * as Style from './TabMenu.styles'
import { useNavigate } from 'react-router-dom'

interface TabMenuProps {
    tabItems: TabItem[]
}

function TabMenu({ tabItems }: TabMenuProps) {
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState(0)

    const onClickTab = (tabItem: TabItem, idx: number) => {
        setSelectedTab(idx)
        navigate(tabItem.id)
    }
    return (
        <>
            <Style.Wrapper>
                {tabItems.map((item, idx) => {
                    return (
                        <Style.Item
                            key={idx}
                            idx={idx}
                            onClick={() => onClickTab(item, idx)}
                            selectedTab={selectedTab}
                        >
                            {item.label}
                        </Style.Item>
                    )
                })}
            </Style.Wrapper>
        </>
    )
}

export default TabMenu
