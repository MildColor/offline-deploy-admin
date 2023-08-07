import React, { LabelHTMLAttributes } from 'react'
import * as Style from './Label.styles'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    width?: string
    height?: string
    variant?: string
    textLineHeight?: string
    children?: React.ReactNode
}

function Label({
    width,
    height,
    textLineHeight,
    children,
    ...props
}: LabelProps) {
    return (
        <Style.Label
            width={width}
            height={height}
            textLineHeight={textLineHeight}
            {...props}
        >
            {children}
        </Style.Label>
    )
}

export default Label
