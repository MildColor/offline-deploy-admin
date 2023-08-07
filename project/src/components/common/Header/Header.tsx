import { RouteItems } from '@constants/routeList'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { HtmlHTMLAttributes, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Style from './Header.styles'
import { getRouteIndexes } from '@utils/getRouteIndexes'
import { getRouteName } from '@utils/getRouteName'
import { getSubRouteName } from '@utils/getSubRouteName'

interface HeaderProps extends HtmlHTMLAttributes<HTMLElement> {
    routeList: RouteItems[]
}

function Header({ routeList, children, ...props }: HeaderProps) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [index, subIndex] = getRouteIndexes(pathname, routeList)

    useEffect(() => {
        if (index === 0 && subIndex === 0) {
            navigate('/dashboard')
        }
    }, [index, navigate, subIndex])

    return (
        <Style.Header {...props}>
            <span>
                {getRouteName(routeList, index)}
                {subIndex !== -1
                    ? ' / ' + getSubRouteName(routeList, index, subIndex)
                    : ''}
            </span>
            <FontAwesomeIcon icon={faUser} size="lg" />
        </Style.Header>
    )
}

export default Header
