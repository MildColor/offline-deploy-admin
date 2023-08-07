import React, { ButtonHTMLAttributes, useState } from 'react'
import * as Style from './Button.styles'
import getFormattedDate from '@utils/getFormattedDate'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string
    height?: string
    variant?: string
}

export interface ApplyButtonProps extends ButtonProps {
    direction?: string
    children: React.ReactNode
    onClick?: () => void
}

function Button({ width, height, variant, children, ...props }: ButtonProps) {
    return (
        <Style.Button
            variant={variant}
            width={width}
            height={height}
            {...props}
        >
            {children}
        </Style.Button>
    )
}

export default Button

export function ApplyButton({
    direction,
    children,
    onClick,
    ...props
}: ApplyButtonProps) {
    // query 값을 받아서 이 컴포넌트 내부에서 바로 적용시키는 것도 생각해보기
    const [formattedDate, setFormattedDate] = useState<string>()

    const handleClick = () => {
        const nowDate = getFormattedDate()
        setFormattedDate(nowDate)

        if (onClick) {
            onClick()
        }
    }
    return (
        <>
            <Style.UpdateSpan>
                최종 업데이트 일시 <br />
                {formattedDate}
            </Style.UpdateSpan>
            <Button variant="blue" onClick={handleClick} {...props}>
                {children}
            </Button>
        </>
    )
}
