import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

export const useForm = <T extends Object>(
    initialState: T,
    option?: { useTrim: boolean }
): [
    T,
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    Dispatch<SetStateAction<T>>
] => {
    const [state, setState] = useState(initialState)

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'number') {
            return setState({ ...state, [name]: parseInt(value) })
        }

        option?.useTrim
            ? setState({ ...state, [name]: value.trim() })
            : setState({ ...state, [name]: value })
    }

    return [state, onChange, setState]
}
