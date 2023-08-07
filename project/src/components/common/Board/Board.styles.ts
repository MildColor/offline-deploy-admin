import styled, { css } from 'styled-components'
import { BoardProps } from './Board'
import { flexCenter } from '@styles/mixins'

export const BoardFrame = styled.div<BoardProps>`
    display: flex;
    position: relative;
    flex-direction: ${({ direction }) => direction ?? 'row '};
    width: ${({ width }) => width ?? '100%'};
    height: ${({ height }) => height};
    justify-content: ${({ justifyContent }) => justifyContent ?? 'start'};
    align-items: ${({ alignItems }) => alignItems ?? 'stretch'};
    margin: ${({ margin }) => margin ?? '0 auto'};
    padding: ${({ padding }) => padding ?? '0'};
    ${({ variant, padding, margin, direction, useYScroll }) => {
        switch (variant) {
            case 'bordered':
                return css`
                    border: 1px solid;
                    border-color: ${({ theme }) => theme.colors.gray[0]};
                    border-radius: 1.5rem;
                    padding: ${padding ?? '1rem'};
                    margin: ${margin ?? 0};
                    flex-direction: ${direction ?? 'column'};
                    .caption {
                        font-weight: bold;
                        margin: 0.5rem 0;
                    }
                `
            case 'blueBoard':
                return css`
                    flex: 1;
                    background-color: ${({ theme }) => theme.colors.blue[5]};
                    border-radius: 0.5rem;
                    padding: ${padding ?? '1rem'};
                    margin: ${margin ?? 0};
                    overflow-y: ${useYScroll ? 'scroll' : 'auto'};
                `
            case 'warning':
                return css`
                    ${flexCenter}
                    font-size: 1.4rem;
                    background-color: ${({ theme }) => theme.colors.blue[3]};
                    border-radius: 20px;
                    padding: ${padding ?? '1rem'};
                    margin: ${margin ?? 0};
                    color: ${({ theme }) => theme.colors.white[0]};
                    height: 2rem;
                `
        }
    }}
`
