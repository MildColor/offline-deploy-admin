import styled from 'styled-components'
import { LabelProps } from './Label'

export const Label = styled.label<LabelProps>`
    width: ${(props) => props.width ?? '100%'};
    height: ${({ height }) => height};
    text-align: center;
    line-height: ${({ textLineHeight }) => textLineHeight};

    .importantSpan {
        color: red;
        margin: 0 0.5rem;
    }
`
