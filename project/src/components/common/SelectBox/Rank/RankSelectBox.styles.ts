import styled from 'styled-components'

export const Select = styled.select`
    /* remove default style */
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    /* custom style */
    flex: 1;
    height: 2.5rem;
    background-color: ${({ theme }) => theme.colors.blue[5]};
    padding: 0 1rem;
    border-radius: 5px;
    border: none;

    &:focus {
        outline-color: ${({ theme }) => theme.colors.blue[3]};
    }
`
