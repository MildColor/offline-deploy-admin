import { DefaultTheme, css } from 'styled-components'

export const colors = {
    white: {
        '0': 'white',
    },
    blue: {
        '0': '#0043c1',
        '3': '#3880d8',
        '5': '#e0ebf5',
    },
    gray: {
        '0': '#BDBCBC',
        '3': '#d9d9d9',
    },
    red: {
        '0': '#FF0000',
        '3': '#FF8080',
    },
} as const

export const animation = {
    hoverButton: css`
        &:hover {
            transform: scale(1.1);
            transition: 0.3s;
        }
    `,
} as const

export type ColorTypes = typeof colors
export type AnimationTypes = typeof animation

const theme: DefaultTheme = { colors, animation }
const darkTheme: DefaultTheme = { colors, animation }

export default theme
