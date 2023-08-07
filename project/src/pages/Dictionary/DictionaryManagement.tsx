import ForbiddenDictionaryBoard from '@components/Dictionary/ForbiddenDictionaryBoard'
import SynonymDictionaryBoard from '@components/Dictionary/SynonymDictionaryBoard'
import UserDictionaryBoard from '@components/Dictionary/UserDictionaryBoard'
import { BoardFrame } from '@components/common/Board/Board'
import { ApplyButton } from '@components/common/Button/Button'
import { SearchInput } from '@components/common/Input/Input'
import Modal from '@components/common/Modal/Modal'
import TabMenu from '@components/common/TabMenu/TabMenu'
import { dictionaryTabItems } from '@constants/tabItems'
import { useDebounce } from '@hooks/common/useDebounce'
import { ChangeEvent, useState } from 'react'

function DictionaryManagement() {
    const [searchValue, setSearchValue] = useState<string>('')

    const debouncedSearchValue = useDebounce(searchValue, 500)

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchValue(value)
    }

    const handleApply = () => {}

    return (
        <BoardFrame direction="column" height="90vh">
            <BoardFrame
                alignItems="center"
                justifyContent="center"
                margin="0.5rem 0"
                direction="column"
            >
                <TabMenu tabItems={dictionaryTabItems} />
                <SearchInput width="33%" onChange={handleChangeInput} />
            </BoardFrame>
            <BoardFrame justifyContent="space-between" height="100%">
                <UserDictionaryBoard search={debouncedSearchValue} />
                <SynonymDictionaryBoard search={debouncedSearchValue} />
                <ForbiddenDictionaryBoard search={debouncedSearchValue} />
            </BoardFrame>
            <BoardFrame
                alignItems="center"
                justifyContent="flex-end"
                margin="0.5rem 0"
            >
                <ApplyButton onClick={handleApply}>새로고침</ApplyButton>
            </BoardFrame>
        </BoardFrame>
    )
}

export default DictionaryManagement
