import checkEmptyObject from '@utils/checkEmptyObject'

type QueryKeyFunction = (...args: any[]) => string[]
const createQueryKey = (key: string, ...args: any[]): string[] => [key, ...args]

export const CACHE_KEYS = {
    // getList: ({ search, page }: ListRequestType) => [page, search],

    // autocomplete
    autocompeleteTerms: (params: ListRequestType = {}) => {
        const { search, page, sort, order } = params

        return checkEmptyObject(params)
            ? ['getAutocompeleteTerms']
            : ['getAutocompeleteTerms', search, page, sort, order]
    },
    // cluster
    clusterTotal: ['getClusterTotal'],
    clusterSearchRate: ['getClusterSearchRate'],
    clusterSearchLatency: ['getClusterSearchLatency'],
    clusterIndexingRate: ['getClusterIndexingRate'],
    clusterIndexingLatency: ['getClusterIndexingLatency'],

    // dictionary
    userDictionary: (params: ListRequestType) => {
        const { search, page } = params

        return checkEmptyObject(params)
            ? ['getUserDictionary']
            : ['getUserDictionary', search, page]
    },

    userSingleWordDictionary: (params: CommonRequestType) => {
        const { search } = params
        return checkEmptyObject(params)
            ? ['getUserSigleWordDictionary']
            : ['getUserSigleWordDictionary', search]
    },
    synonymDictionary: (params: ListRequestType) => {
        const { search, page } = params

        return checkEmptyObject(params)
            ? ['getSynonymDictionary']
            : ['getSynonymDictionary', search, page]
    },
    forbiddenDictionary: ({ search, page }: ListRequestType) => {
        const params = { search, page }

        return checkEmptyObject(params)
            ? ['getForbiddenDictionary']
            : ['getOverridingSearchTerms', search, page]
    },

    // indices
    indices: ({ search, page }: ListRequestType) => [
        'getIndices',
        search,
        page,
    ],
    indicesDetail: (index_name: string) => ['getIndicesDetail', index_name],

    //popularTerms
    overridingSearchTerms: ({ search, page }: ListRequestType = {}) => {
        const params = { search, page }

        return checkEmptyObject(params)
            ? ['getOverridingSearchTerms']
            : ['getOverridingSearchTerms', search, page]
    },
    overridingSearchTermsById: ({ pfId }: { pfId: string }) => [
        'getOverridingSearchTermsById',
        pfId,
    ],
    overridingSearchTermsRank: () => ['overridingSearchTermsRank'],

    hideSearchTerms: ({ search, page }: ListRequestType = {}) => {
        const params = { search, page }

        return checkEmptyObject(params)
            ? ['getHideSearchTerms']
            : ['getHideSearchTerms', search, page]
    },
    hideSearchTermsById: ({ phId }: { phId?: string }) => [
        'getHideSearchTermsById',
        phId,
    ],

    // searchRank
    rank: ({ search, page }: ListRequestType) => ['getRank', search, page],

    //statistic
    searchTrend: ({ from, to }: StatisticsRequestType) => [
        'getSearchTrend',
        from,
        to,
    ],
    topQuery: ({ from, to }: StatisticsRequestType) => [
        'getTopQuery',
        from,
        to,
    ],
    zeroQuery: ({ from, to }: StatisticsRequestType) => [
        'getZeroQuery',
        from,
        to,
    ],
    // suggestedTerms
    suggestedTerms: ({ search, page, sort, order }: ListRequestType = {}) => {
        const params = { search, page, sort, order }

        return checkEmptyObject(params)
            ? ['getSuggestedTerms']
            : ['getSuggestedTerms', search, page, sort, order]
    },
    suggestedTermsById: ({ sgId }: CommonRequestType) => [
        'getSuggestedTerms',
        sgId,
    ],

    // typoCorreciton
    typoCorreciton: ({ search, page, sort, order }: ListRequestType = {}) => {
        const params = { search, page, sort, order }

        return checkEmptyObject(params)
            ? ['getTypoCorreciton']
            : ['getTypoCorreciton', search, page, sort, order]
    },
    typoCorrecitonById: ({ mtId }: CommonRequestType) => [
        'getTypoCorrecitonById',
        mtId,
    ],

    // users
    users: ({ search, page, sort, order }: ListRequestType = {}) => {
        const params = { search, page, sort, order }

        return checkEmptyObject(params)
            ? ['getUsers']
            : ['getUsers', search, page, sort, order]
    },

    user: ({ userId }: { userId?: string }) => {
        return ['getUserById', userId]
    },
}
