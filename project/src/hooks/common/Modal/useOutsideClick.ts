import React, { RefObject, useEffect } from 'react'

interface Params {
    ref: RefObject<HTMLElement | null>
    callback: () => void
}

function useOutsideClick({ ref, callback }: Params) {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLDivElement

            if (ref.current && ref.current.className === target.className) {
                callback()
            }
        }

        window.addEventListener('mousedown', handleClick)

        return () => window.removeEventListener('mousedown', handleClick)
    }, [ref, callback])
}

export default useOutsideClick
