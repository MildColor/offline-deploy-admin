import styled from 'styled-components'
import { MainItemProps } from './MainItem'
import { SubItemProps } from './SubItem'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'

export const MainItem = styled.div<MainItemProps>`
    ${getTypographyStyles(TYPOGRAPHY_STYLES.Headline1_M)}
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 4rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.white[0]};
    background-color: ${({ theme, isActive }) =>
        isActive ? theme.colors.blue[0] : theme.colors.blue[3]};
`
export const SubItem = styled.a<SubItemProps>`
    display: block;
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.white[0]};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : '400')};
`
