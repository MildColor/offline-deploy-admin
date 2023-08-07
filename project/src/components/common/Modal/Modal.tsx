import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import useOutsideClick from '@hooks/common/Modal/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { absoluteCenter, flexCenter, flexColumn } from '@styles/mixins'
import { ModalType } from '@recoil/Modal/atoms'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'
import { useModal } from '@hooks/common/Modal/useModal'

export interface ModalProps {
    variant?: string
    modalDataState?: ModalType // modalDataState 속성 추가
    children?: React.ReactNode
}

function Modal({ variant, children, ...props }: ModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null)

    const { state, openModal, closeModal } = useModal()

    useOutsideClick({ ref: modalRef, callback: closeModal })

    return createPortal(
        <>
            {state.isOpen && (
                <Container ref={modalRef}>
                    <ModalBody
                        className="ModalBody"
                        variant={variant}
                        modalDataState={state}
                    >
                        <CloseButton
                            icon={faTimes}
                            size="lg"
                            onClick={closeModal}
                        />
                        <div className="title">
                            {typeof state.title === 'string' ? state.title : ''}
                        </div>
                        <div className="subTitle">{state.subTitle}</div>
                        <div className="content">{state.component}</div>
                    </ModalBody>
                </Container>
            )}
        </>,
        document.getElementById('modal') as HTMLElement
    )
}

export default Modal

const Container = styled.div`
    position: fixed;
    ${flexCenter}
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
`
const ModalBody = styled.div<ModalProps>`
    ${absoluteCenter}
    display: flex;
    ${flexColumn}
    width: ${({ modalDataState }) => modalDataState?.width ?? '50rem'};
    height: ${({ modalDataState }) => modalDataState?.height ?? 'auto'};
    background-color: white;
    z-index: 10;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    padding: 3rem;
    transition: all 0.3 ease-in-out;

    .title {
        ${getTypographyStyles(TYPOGRAPHY_STYLES.Headline1_B)}
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .subTitle {
        font-size: 1.4rem;
        font-weight: 400;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.gray[0]};
    }

    .content {
        /* display: flex; */
    }

    ${({ variant }) => {
        switch (variant) {
            case 'indexDetail':
                return css`
                    position: fixed;
                    top: 0;
                    left: auto;
                    right: 0;
                    height: 100vh;
                    width: 40%;
                    transform: translate(0%, 0%);
                    border-radius: 0;
                `
        }
    }}
`

const CloseButton = styled(FontAwesomeIcon)`
    cursor: pointer;
    position: absolute;
    right: 1rem;
    top: 1rem;
`

const ContentWrapper = styled.div<ModalProps>`
    ${flexColumn} /* height: 100rem; */
    ${({ variant }) => {
        switch (variant) {
            case 'indexDetail':
                return css`
                    height: 80vh;
                `
        }
    }}
`
