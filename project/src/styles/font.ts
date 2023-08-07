import { css } from 'styled-components'

type TypographyStyle = {
    fontSize: number
    lineHeight: number
    fontWeight: number
}

export const ellipsis = (lineLimit = 2) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lineLimit};
    -webkit-box-orient: vertical;
`

export const TYPOGRAPHY_STYLES = {
    Headline1_B: {
        fontSize: 1.8,
        lineHeight: 2.4,
        fontWeight: 600,
    },
    Headline2_B: {
        fontSize: 1.6,
        lineHeight: 2.4,
        fontWeight: 600,
    },
    Headline3_B: {
        fontSize: 1.4,
        lineHeight: 2.4,
        fontWeight: 600,
    },

    Headline1_M: {
        fontSize: 1.6,
        lineHeight: 2.4,
        fontWeight: 500,
    },
}

export const getTypographyStyles = (typography: TypographyStyle) => {
    const { fontSize, lineHeight, fontWeight } = typography
    return css`
        font-size: ${fontSize}rem;
        line-height: ${lineHeight}rem;
        font-weight: ${fontWeight};
    `
}

// export const TitleTypo = css`
//     font-size: 1.8rem;
//     font-weight: 600;
// `

// export const SemiBoldTypo = css`
//     font-size: 1.6rem;
//     font-weight: 500;
// `
