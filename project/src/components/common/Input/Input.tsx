import React, { InputHTMLAttributes } from 'react'
import * as Style from './Input.styles'
import { BoardFrame } from '../Board/Board'
import Label from '../Label/Label'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    width?: string
    height?: string
    margin?: string
    variant?: string
    useIcon?: boolean
    labelText?: string
    textLineHeight?: string
    onClick?: () => void
    children?: React.ReactNode
}

export interface LabelInputProps extends InputProps {
    labelWidth?: string
    important?: boolean
    subText?: string
}

export function Input({ ...props }: InputProps) {
    return <Style.Input {...props} />
}

export function CheckBoxInput({
    width,
    id,
    labelText,
    textLineHeight = '2.4rem',
    ...props
}: InputProps) {
    return (
        <BoardFrame width={width}>
            <Style.CheckBoxInput type="checkbox" id={id} {...props} />
            <Label htmlFor={id} textLineHeight={textLineHeight}>
                {labelText}
            </Label>
        </BoardFrame>
    )
}

export function SearchInput({
    width,
    height = '2.5rem',
    margin,
    useIcon = true,
    onClick,
    ...props
}: InputProps) {
    return (
        <BoardFrame width={width} height={height} margin={margin ?? '0'}>
            <Input width="100%" variant="search" {...props} />

            {useIcon && (
                <Style.SearchIcon icon={faSearch} size="lg" onClick={onClick} />
            )}
        </BoardFrame>
    )
}

export function LabelInput({
    width,
    labelWidth,
    labelText,
    subText,
    important = false,
    height = '2.5rem',
    margin,
    onClick,
    ...props
}: LabelInputProps) {
    return (
        <BoardFrame margin={margin ?? '1rem 0'} alignItems="center">
            <Label
                width={labelWidth ?? '14rem'}
                textLineHeight="2.4rem"
                height="2rem"
            >
                {labelText}
                {important ? <span className="importantSpan">*</span> : <></>}
            </Label>
            <Input variant="normal" {...props} />
            <StSpan>{subText}</StSpan>
        </BoardFrame>
    )
}

const StSpan = styled.span`
    line-height: 2.4rem;
    font-size: 1.4rem;
    padding: 0 0.5rem;
`
