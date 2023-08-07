import styled, { css } from 'styled-components'
import { InputProps } from './Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Input = styled.input<InputProps>`
    width: ${({ width }) => width ?? '100%'};
    height: ${({ height }) => height};
    border: 0;
    outline: 0;
    ${({ variant, width }) => {
        switch (variant) {
            case 'register':
                return css`
                    border: 1px solid;
                    border-color: ${({ theme }) => theme.colors.blue[0]};
                    width: 30rem;
                    height: 4rem;
                    background-color: ${({ theme }) => theme.colors.blue[5]};
                    padding: 0 1rem;
                `

            case 'search':
                return css`
                    border: 1px solid;
                    border-color: ${({ theme }) => theme.colors.gray[0]};
                    border-radius: 2rem;
                    padding: 0 3rem 0 1rem;
                `

            case 'normal':
                return css`
                    flex: 1;
                    height: 2.5rem;
                    background-color: ${({ theme }) => theme.colors.blue[5]};
                    padding: 0 1rem;
                    border-radius: 5px;
                `
        }
    }}
`

export const CheckBoxInput = styled.input<InputProps>`
    /* width: ${({ width }) => width ?? '100%'}; */
    height: ${({ height }) => height};
`

export const Label = styled.label``

export const SearchInput = styled.div``

export const SearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.gray[0]};
    cursor: pointer;
`
