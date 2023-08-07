import api from '../api/api'

export const dictionaryApis = {
    // user
    // 사용자 사전 조회
    getUserDicitonary: async ({ page, search }: ListRequestType) => {
        const params = { page, search }

        return await api.get(`dict/custom`, { params })
    },

    // 사용자 단일어 사전 조회
    getUserSingleWordDictionary: async (params: CommonRequestType) =>
        await api.get(`dict/custom/single`, { params }),

    // 사용자 단일어 사전 등록
    postUserSingleWordDictionary: async ({
        keyword,
    }: KeywordMutationRequestType) =>
        await api.post(`dict/custom/single`, { keyword }),

    // 사용자 합성어 사전 등록
    postUserMultipleWordDictionary: async ({
        keyword,
        rgisWord,
    }: KeywordMutationRequestType) =>
        await api.post(`dict/custom/multiple`, { keyword, rgisWord }),

    // 사용자 사전 수정
    updateUserDictionary: async ({
        customDictId,
        keyword,
        rgisWord,
    }: KeywordMutationRequestType) =>
        await api.put(`dict/custom/${customDictId}`, { keyword, rgisWord }),

    // 사용자 사전 삭제
    deleteUserDictionary: async (customDictId: string) =>
        await api.delete(`dict/custom/${customDictId}`),

    // 동의어
    // 동의어 사전 불러오기
    getSynonymDictionary: async (params: ListRequestType) =>
        await api.get(`dict/synonym`, { params }),
    // 동의어 사전 등록
    postSynonymDictionary: async ({
        keyword,
        synomWord,
    }: KeywordMutationRequestType) =>
        await api.post(`dict/synonym`, { keyword, synomWord }),

    // 동의어 사전 수정
    updateSynonymDictionary: async ({
        synomDictId,
        keyword,
        synomWord,
    }: KeywordMutationRequestType) =>
        await api.post(`dict/synonym/${synomDictId}`, { keyword, synomWord }),

    // 동의어 사전 삭제
    deleteSynonymDictionary: async (synomDictId: string) =>
        await api.delete(`dict/synonym/${synomDictId}`),

    // 금칙어
    // 금칙어 사전 불러오기
    getForbiddenDictionary: async (params: ListRequestType) =>
        await api.get(`dict/stopword`, { params }),

    // 금칙어 사전 등록
    postForbiddenDictionary: async ({ keyword }: KeywordMutationRequestType) =>
        await api.post(`dict/stopword`, { keyword }),

    // 금칙어 사전 수정
    updateForbiddenDictionary: async ({
        id,
        stopword,
    }: {
        id: string
        stopword: string
    }) => await api.post(`dict/stopword/${id}`, stopword),

    // 금칙어 사전 삭제
    deleteForbiddenDictionary: async (stwdDictId: string) =>
        await api.delete(`dict/stopword/${stwdDictId}`),

    // 사전 적용
    postDictionaryUpdate: async () => await api.post(`dic_update`),
}
