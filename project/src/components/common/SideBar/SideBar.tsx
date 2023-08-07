import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import MainItem from '../AccordionMenu/MenuItems/MainItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import splitUrlBySlash from '@utils/splitUrlBySlash'
import { RouteItems } from '@constants/routeList'

interface SideBarProps {
    routeList: RouteItems[]
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

function SideBar({ isOpen, setIsOpen, routeList, children }: SideBarProps) {
    const { pathname } = useLocation()

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleMenuClick = (index: number) => {
        setIsOpen(true)
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const segments = splitUrlBySlash(pathname)

        const index = routeList.findIndex(
            (item) => item.main.PATH === '/' + segments[0]
        )
        setActiveIndex(index)
    }, [routeList, pathname])

    return (
        <SideBarContainer isOpen={isOpen}>
            <HamburgerMenuWrapper onClick={toggleMenu}>
                <HamburgerIcon />
                <HamburgerIcon />
                <HamburgerIcon />
            </HamburgerMenuWrapper>

            {isOpen ? (
                <SideBarWrapper>{children}</SideBarWrapper>
            ) : (
                <SideBarWrapper>
                    {routeList.map((item, index) => {
                        return (
                            <MainItem
                                key={index}
                                onClick={() => handleMenuClick(index)}
                                isActive={activeIndex === index}
                            >
                                <Icon
                                    icon={item.main.icon ?? faHouse}
                                    size="sm"
                                />
                            </MainItem>
                        )
                    })}
                </SideBarWrapper>
            )}
        </SideBarContainer>
    )
}

export default SideBar

const SideBarContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    margin-right: 20rem;
    width: ${({ isOpen }) => (isOpen ? '20rem' : '4rem')};
    background-color: ${({ theme }) => theme.colors.blue[3]};
    transition: all 0.3s ease-in-out;
`

const HamburgerIcon = styled.div`
    width: 2rem;
    height: 0.3rem;
    background-color: ${({ theme }) => theme.colors.white[0]};
    margin: 0.25rem 0;
`

const HamburgerMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    margin: 0 1rem;
    padding: 1rem 0;
    position: relative;
`
const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: 95%;
`
const Icon = styled(FontAwesomeIcon)`
    display: flex;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.white[0]};
`
