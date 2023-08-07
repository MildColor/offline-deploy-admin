import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'

interface LogoProps extends LinkProps {
    color?: string
    children: React.ReactNode
}

function Logo({ color, children, ...props }: LogoProps) {
    return (
        <StLogo color={color} {...props}>
            {children}
        </StLogo>
    )
}

export default Logo

const StLogo = styled(Link)`
    color: ${({ theme, color }) => color ?? theme.colors.blue[0]};
    font-size: 4.5rem;
    font-weight: 900;
    text-align: center;
`
