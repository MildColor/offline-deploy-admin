import { ReactNode } from 'react'
import { atom } from 'recoil'

export type ModalType = {
    component: ReactNode
    isOpen: boolean
    title: string | ((title: string) => string)
    subTitle?: string
    width?: string
    height?: string
    callback?: () => any
}

// export const modalState = atom<boolean>({
//     key: 'modalState',
//     default: false,
// })

export const modalState = atom<ModalType>({
    key: 'ModalState',
    default: {
        component: null,
        isOpen: false,
        title: '',
        subTitle: '',
        width: '',
        height: '',
        callback: () => {},
    },
})
