import { RouteItems } from '@constants/routeList'
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flexCenter, flexColumn } from '@styles/mixins'
import splitUrlBySlash from '@utils/splitUrlBySlash'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MainItem from './MenuItems/MainItem'
import SubItem from './MenuItems/SubItem'
import { removeLocalStorage } from '@utils/localStorage'
import { ACCESS_TOKEN_KEY } from '@constants/token'
import { PAGE_PATH } from '@constants/path'

interface AccordionMenuProps {
    routeList: RouteItems[]
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({ routeList }) => {
    const { pathname } = useLocation()
    const navigation = useNavigate()

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleAccordionClick = (index: number, item: RouteItems) => {
        if (item.sub.length === 0 && item.main.PATH) {
            navigation(item.main.PATH)
        }
        setActiveIndex(activeIndex === index ? null : index)
    }

    const handleClickSignOut = () => {
        try {
            removeLocalStorage(ACCESS_TOKEN_KEY)
            navigation(PAGE_PATH.SIGN_IN)
        } catch (error) {
            alert('Something wrong! Please try again')
        }
    }

    useEffect(() => {
        const segments = splitUrlBySlash(pathname)

        const index = routeList.findIndex(
            (item) => item.main.PATH === '/' + segments[0]
        )
        setActiveIndex(index)
    }, [routeList, pathname])

    return (
        <>
            <MenuContainer>
                <div>
                    {routeList.map((item, index) => {
                        return (
                            <MenuItemContainer key={index}>
                                <MainItem
                                    onClick={() =>
                                        handleAccordionClick(index, item)
                                    }
                                    isActive={activeIndex === index}
                                >
                                    <Icon
                                        icon={item.main.icon ?? faHouse}
                                        size="sm"
                                    />
                                    {item.main.NAME}
                                </MainItem>

                                {activeIndex === index && (
                                    <SubItemsContainer>
                                        {item.sub.map((subItem, subIndex) => (
                                            <SubItem
                                                key={subIndex}
                                                href={
                                                    item.main.PATH +
                                                    subItem.PATH
                                                }
                                                isActive={
                                                    item.main.PATH +
                                                        subItem.PATH ===
                                                    pathname
                                                }
                                            >
                                                {subItem.NAME}
                                            </SubItem>
                                        ))}
                                    </SubItemsContainer>
                                )}
                            </MenuItemContainer>
                        )
                    })}
                </div>
                <MainItem onClick={handleClickSignOut}>
                    <Icon icon={faRightFromBracket} size="sm" />
                    로그아웃
                </MainItem>
            </MenuContainer>
        </>
    )
}

const MenuContainer = styled.div`
    ${flexColumn}
    background-color: ${({ theme }) => theme.colors.blue[3]};
    width: 100%;
    height: 100%;
    justify-content: space-between;
`

const MenuItemContainer = styled.div`
    margin-bottom: 10px;
`

const SubItemsContainer = styled.div`
    margin-top: 0.5rem;
    background-color: ${({ theme }) => theme.colors.blue[3]};
    margin: 0 4rem;
`

const Icon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.colors.white[0]};
    margin-right: 1rem;
`

export default AccordionMenu
