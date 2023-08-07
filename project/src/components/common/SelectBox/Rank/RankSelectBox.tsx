import React, { ChangeEvent, useEffect, useState } from 'react'
import { SelectHTMLAttributes } from 'react'
import * as Style from './RankSelectBox.styles'
import { BoardFrame } from '@components/common/Board/Board';
import Label from '@components/common/Label/Label'
import styled from 'styled-components';

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
    state: string;
    subText?: string;
}

function RankSelectBox({ 
    state,
    onChange, 
    subText,
    ...props 
}: SelectBoxProps) {
    const [defaultOptions, ] = useState<string[]>(() => [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ])

    return (
        <BoardFrame margin={'1rem 0'} alignItems="flex-start">
            <Label
                width='14rem'
                textLineHeight="2.4rem"
                height="2rem"
            >
                순위(1~10)
                <span className="importantSpan">*</span>
            </Label>
            <Style.Select
                name={'rank'} 
                onChange={onChange}
                value={state}
            >
                <option 
                    value="" 
                    selected 
                    disabled 
                    hidden
                >순위를 선택하세요.</option>
                {defaultOptions.map((option) => {
                    if(state && option === state)
                        return <option selected>{option}</option>
                    return <option>{option}</option>
                })}
            </Style.Select>
            <StSpan>{subText}</StSpan>
        </BoardFrame>
    )
}

export default RankSelectBox

const StSpan = styled.span`
    line-height: 2.4rem;
    font-size: 1.4rem;
    padding: 0 0.5rem;
`