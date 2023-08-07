interface ListRequestType {
    page?: number
    search?: string
    sort?: string
    order?: 'desc' | 'asc' | undefined
}

interface CommonRequestType {
    [key: string]: boolean | number | string
}

interface KeywordMutationRequestType {
    keyword: string
    [key: string]: string[] | boolean | number | string
}
