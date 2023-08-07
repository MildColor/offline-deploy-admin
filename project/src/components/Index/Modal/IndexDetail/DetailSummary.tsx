import React from 'react'
import styled from 'styled-components'

function DetailSummary() {
    // const { modalDataState } = useModal()
    // const data = modalDataState

    const summaryItems = {
        Health: 'green',
        Primaries: 1,
        Docs갯수: 943,
        용량: 3.57,
    }
    const entries = Object.entries(summaryItems)

    return (
        <>
            {entries.map((item, idx) => {
                return (
                    <div key={idx}>
                        <Item>
                            <span>{item[0]}</span>
                            <span>{item[1]}</span>
                        </Item>
                        <Divider />
                    </div>
                )
            })}
        </>
    )
}

export default DetailSummary

const Item = styled.div`
    width: 100%;
    padding: 1.5rem 0;
    span:first-child {
        display: inline-block;
        width: 40%;
        font-weight: 600;
    }
`

const Divider = styled.div`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray[3]};
    height: 1px;
`
