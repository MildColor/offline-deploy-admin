import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { routeList } from '@constants/routeList'
import AccordionMenu from '../AccordionMenu/AccodionMenu'
import Logo from '../Logo/Logo'
import { PAGE_PATH } from '@constants/path'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
import { flexColumn } from '@styles/mixins'
import Modal from '../Modal/Modal'

interface LayoutProps {
    children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Container isOpen={isOpen}>
            <SideBar
                routeList={routeList}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <StLogo to={PAGE_PATH.DASH_BOARD} color="white">
                    5works
                </StLogo>
                <AccordionMenu routeList={routeList} />
            </SideBar>
            <ContentWrapper>
                <Header routeList={routeList} />
                <Outlet />
            </ContentWrapper>
            <Modal />
        </Container>
    )
}

export default Layout

const Container = styled.div<{ isOpen: boolean }>`
    display: flex;
    height: 100%;
    margin-left: ${({ isOpen }) => (isOpen ? '20rem' : '4rem')};
    margin-bottom: 1rem;
    transition: all 0.3s ease-in-out;
    /* height: 100vh; */
    /* width: 100vw; */
`
const StLogo = styled(Logo)`
    margin: 4rem 0;
`
const ContentWrapper = styled.section`
    ${flexColumn}
    flex-grow: 1;
    padding: 0 1.5rem;
`
