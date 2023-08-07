import { useState } from 'react'

export const useTag = <T extends string[]>(
    initialState: T
): [
    T,
    (str: string) => void,
    (str: string) => void,
] => {
    const [tagArr, setTagArr] = useState(initialState)

    const handleAddTag = (str: string) => {
        const trimStr = str.trim();
        if(trimStr !== "") {
            setTagArr((prev) => {
                const set = new Set(prev);
                set.add(trimStr);
                return Array.from(set) as T;
            });
        }
    }

    const handleDeleteTag = (str: string) => {
        setTagArr((prev) => {
            const set = new Set(prev);
            set.delete(str);
            return Array.from(set) as T;
        });
    }

    return [tagArr, handleAddTag, handleDeleteTag]
}
