import React from 'react'
import * as Style from './MenuItems.styles'

export interface MainItemProps {
    children?: React.ReactNode
    isActive?: boolean
    onClick?: () => void
}

function MainItem({ isActive, onClick, children }: MainItemProps) {
    return (
        <Style.MainItem isActive={isActive} onClick={onClick}>
            {children}
        </Style.MainItem>
    )
}

export default MainItem
