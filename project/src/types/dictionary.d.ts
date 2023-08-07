interface UserDictionaryType {
    customDictId: string
    keyword: string
    rgisWord: string
    createrName: string
    updateName: string
    createdAt: string
    updatedAt: string
    type: string
}

type SingleWordType = Partial<
    UserDictionaryType,
    'customDictId',
    'keyword',
    'rgisWord'
>

interface SynonymDictionaryType {
    synomDictId: string
    keyword: string
    synomWord: string
    createrName: string
    createdAt: string
    updatedAt: string
}

interface StopwordDictionaryType {
    stwdDictId: string
    keyword: string
    createrName: string
    updaterName: string
    createdAt: string
    updatedAt: string
}
