import styled from 'styled-components'

export const Header = styled.header`
    display: flex;
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.blue[3]};
    font-weight: bold;
    font-size: 2rem;
`
