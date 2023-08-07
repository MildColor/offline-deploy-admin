import styled, { css } from 'styled-components'
import { ButtonProps } from './Button'

export const Button = styled.button<ButtonProps>`
    width: ${({ width }) => width ?? '100%'};
    height: ${({ height }) => height};
    :hover {
        background-color: ${({ theme }) => theme.colors.blue[3]};
        color: ${({ theme }) => theme.colors.white[0]};
        transition: all 0.5s ease-in-out;
    }
    ${({ variant, width, height }) => {
        switch (variant) {
            case 'register':
                return css`
                    width: 30rem;
                    height: 4rem;
                    background-color: ${({ theme }) => theme.colors.blue[3]};
                    color: ${({ theme }) => theme.colors.white[0]};
                    font-weiåht: 700;
                `

            case 'normal':
                return css`
                    width: ${width ?? '6rem'};
                    height: ${height ?? '3rem'};
                    text-align: center;
                    margin: auto 0.5rem;
                    line-height: height ?? '2rem';
                    border: 1px solid ${({ theme }) => theme.colors.gray[0]};
                    border-radius: 10px;
                `
            case 'blue':
                return css`
                    width: ${width ?? '10rem'};
                    height: ${height ?? '3rem'};
                    text-align: center;
                    margin: auto 0.5rem;
                    line-height: height ?? '2rem';
                    border-radius: 7px;
                    background-color: ${({ theme }) => theme.colors.blue[3]};
                    font-weight: bold;
                    font-size: 1.6rem;
                    color: ${({ theme }) => theme.colors.white[0]};
                    transition: all 0.3s ease-in-out;
                    :hover {
                        background-color: white;
                        color: ${({ theme }) => theme.colors.blue[3]};
                        box-shadow: 5px 5px 3px #666;
                    }
                `
        }
    }}
`

export const UpdateSpan = styled.span`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray[0]};
    line-height: 1.5rem;
    text-align: center;
    margin: 0.5rem 0;
    width: 15rem;
`
