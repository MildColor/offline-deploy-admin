import React, { AnchorHTMLAttributes } from 'react'
import * as Style from './MenuItems.styles'
export interface SubItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    isActive: boolean
}

function SubItem({ isActive, children, ...props }: SubItemProps) {
    return (
        <Style.SubItem isActive={isActive} {...props}>
            {children}
        </Style.SubItem>
    )
}

export default SubItem
