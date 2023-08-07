import React, { ChangeEvent, useState } from 'react'
import { SelectHTMLAttributes } from 'react'
import * as Style from './DateSelectBox.styles'
interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: { startDate: string; endDate: string }; name: string }[]
    selectDateRange?: string | undefined
}

function DateSelectBox({ options, selectDateRange, ...props }: SelectBoxProps) {
    const [selectedOption, setSelectedOption] = useState<String>()

    const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setSelectedOption(value)
        selectDateRange = value
    }

    return (
        <Style.Select name="날짜 범위" onChange={handleOptionChange}>
            {options.map((option) => (
                <option
                    key={option.value.startDate}
                    value={option.value.startDate}
                >
                    {option.name}
                </option>
            ))}
        </Style.Select>
    )
}

export default DateSelectBox
