import { css } from 'styled-components'
/** Layouts */
export const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const flexRow = css`
    display: flex;
    flex-direction: row;
`

export const fullScreen = css`
    width: 100vw;
    height: 100vh;
    overflow: scroll;
`

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`

export const absoluteCenter = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
