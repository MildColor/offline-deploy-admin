import { flexRow } from '@styles/mixins'
import styled from 'styled-components'

export const Wrapper = styled.div`
    ${flexRow}
    margin: 1rem 0;
`
export const Item = styled.div<{
    idx: number
    selectedTab: number
}>`
    height: 3rem;
    padding: 0 1rem;
    text-align: center;
    line-height: 3rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[3]};
    border-width: 0px 0px 0px
        ${({ idx }) => {
            return idx === 0 ? '0px' : '1px'
        }};

    color: ${({ idx, selectedTab, theme: { colors } }) => {
        return idx === selectedTab ? colors.blue[3] : 'black'
    }};

    font-weight: ${({ idx, selectedTab }) => {
        return idx === selectedTab ? 600 : 400
    }};
    font-size: 1.6rem;
    cursor: pointer;
`
