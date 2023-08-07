import { modalState } from '@recoil/Modal/atoms'
import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'

interface UserModalPropsType {
    title: string | ((title: string) => string)
    subTitle?: string
    width?: string
    height?: string
    callback?: () => any
}
export interface UseModalType extends UserModalPropsType {
    component: ReactNode
    isOpen: boolean
}

export const useModal = () => {
    const [state, setState] = useRecoilState<UseModalType>(modalState)

    const openModal = (
        Component: ReactNode,
        { title, subTitle, width, height, callback }: UserModalPropsType
    ) => {
        console.log('open')
        return setState({
            ...state,
            component: Component,
            isOpen: true,
            title: title,
            subTitle: subTitle,
            width: width,
            height: height,
            callback: callback,
        })
    }
    const closeModal = () => {
        console.log('close')
        return setState({ ...state, component: null, isOpen: false })
    }

    return { state, openModal, closeModal }
}
