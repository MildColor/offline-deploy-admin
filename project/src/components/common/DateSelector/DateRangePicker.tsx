// export {}
import React, { ButtonHTMLAttributes, Ref, forwardRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { BoardFrame } from '../Board/Board'
import styled from 'styled-components'
registerLocale('ko', ko)

type ExampleCustomInputProps = ButtonHTMLAttributes<HTMLButtonElement>
interface dateRangetype {
    startDate: Date | null
    endDate: Date | null
}

function DateRangePicker() {
    const [{ startDate, endDate }, setDateRange] = useState<dateRangetype>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const CustomInput = forwardRef(
        (props: ExampleCustomInputProps, ref: Ref<HTMLButtonElement>) => {
            return (
                <Input {...props} ref={ref}>
                    {props.value}
                </Input>
            )
        }
    )

    return (
        <BoardFrame
            width="23rem"
            margin="0 1rem"
            justifyContent="space-between"
        >
            <DatePicker
                selectsStart
                selected={startDate}
                onChange={(date) =>
                    setDateRange((prev) => ({ ...prev, startDate: date }))
                }
                startDate={startDate}
                endDate={endDate}
                locale={ko}
                customInput={<CustomInput />}
            />
            <StSpan> ~ </StSpan>

            <DatePicker
                selectsEnd
                selected={endDate}
                onChange={(date) =>
                    setDateRange((prev) => ({ ...prev, endDate: date }))
                }
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                locale={ko}
                customInput={<CustomInput />}
            />
        </BoardFrame>
    )
}

export default DateRangePicker

const Input = styled.button`
    width: 10rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    border: 1px solid ${(props) => props.theme.colors.gray[0]};
`
const StSpan = styled.span`
    line-height: 2.5rem;
    height: 2.5rem;
    margin: 0 1rem;
`
