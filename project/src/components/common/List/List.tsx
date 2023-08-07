import { ellipsis } from '@styles/font'
import React from 'react'
import styled from 'styled-components'

interface ListPropsType {
    data: { [key: string]: string | number }[]
}

function List({ data }: ListPropsType) {
    const header = Object.keys(data[0])

    return (
        <ListWrapper>
            <ListHeader>
                {header.map((v, i) => {
                    return <Span key={i}>{v}</Span>
                })}
            </ListHeader>

            <Ul>
                {data.map((v, _) => {
                    return (
                        <Li key={v.id}>
                            {header.map((categoryString, _) => {
                                return (
                                    <>
                                        <Span>{v[categoryString]}</Span>
                                    </>
                                )
                            })}
                        </Li>
                    )
                })}
            </Ul>
        </ListWrapper>
    )
}

export default List

const ListWrapper = styled.div`
    width: 100%;
    height: 100%;
`
const ListHeader = styled.div`
    display: flex;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.gray[0]};
    align-items: center;
`

const Ul = styled.ul``

const Li = styled.li`
    height: 3rem;
    display: flex;
    align-items: center;
`

const Span = styled.span`
    display: inline-block;
    text-align: center;
    flex: 1;
    ${ellipsis(1)}
`
