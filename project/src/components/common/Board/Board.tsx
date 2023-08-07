import React from 'react'
import * as Style from './Board.styles'

export interface BoardProps {
    width?: string
    height?: string
    direction?: string
    variant?: 'bordered' | 'blueBoard' | 'warning'
    justifyContent?: string
    alignItems?: string
    margin?: string
    padding?: string
    useYScroll?: boolean
    children?: React.ReactNode
}

export function BoardFrame({
    width,
    height,
    variant,
    direction,
    justifyContent,
    alignItems,
    margin,
    padding,
    useYScroll,
    children,
    ...props
}: BoardProps) {
    return (
        <Style.BoardFrame
            width={width}
            height={height}
            variant={variant}
            direction={direction}
            alignItems={alignItems}
            justifyContent={justifyContent}
            margin={margin}
            padding={padding}
            useYScroll={useYScroll}
            {...props}
        >
            {children}
        </Style.BoardFrame>
    )
}
