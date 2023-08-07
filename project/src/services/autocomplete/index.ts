import api from '../api/api'

export const autocompleteApis = {
    // 자동완성 불러오기
    getAutocompleteTerms: async (params: ListRequestType) =>
        await api.get(`manage/auto`, { params }),

    // 자동완성 등록
    postAutocompleteTerms: async ({
        keyword,
        trfKeyword,
        weightedVal,
    }: AutoCompleteRegistrationType) =>
        await api.post(`manage/auto`, {
            keyword,
            trfKeyword,
            weightedVal,
        }),

    //자동완성 수정
    updateAutocompleteTerms: async ({
        autoFixDictId,
        keyword,
        trfKeyword,
        weightedVal,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/auto/${autoFixDictId}`, {
            keyword,
            trfKeyword,
            weightedVal,
        }),

    // 자동완성 삭제
    deleteAutocompleteTerms: async (id: string) =>
        await api.delete(`manage/auto/${id}`),

    // 자동완성 적용
    postAutocompleteUpdate: async () => await api.post(`auto_update`),
}
