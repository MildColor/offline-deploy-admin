interface AutoCompleteTermType {
    autoFixDictId: string
    keyword: string
    trfKeyword: string
    reflectAct: string
    weightedVal: number
    createdAt: string
    username: string
}

type AutoCompleteRegistrationType = Pick<
    AutoCompleteTermType,
    'keyword',
    'trfKeyword',
    'weightedVal'
>
