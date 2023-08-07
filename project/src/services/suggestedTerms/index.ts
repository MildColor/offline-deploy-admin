import api from '../api/api'

export const suggestedTermsApis = {
    // 추천 검색어 불러오기
    getSuggestedTerms: async ({ search, page, sort, order }: ListRequestType) =>
        await api.get(`manage/suggest?search=${search}&page=${page}&sort=${sort}&order=${order}`),

    // ID로 추천 검색어 불러오기
    getSuggestedTermsById: async ({ sgId }: CommonRequestType) =>
        await api.get(`manage/suggest/${sgId}`),

    // 추천 검색어 등록
    postSuggestedTerms: async ({
        keyword,
        sgtWord,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/suggest`, { keyword, sgtWord }),

    // 추천 검색어 수정
    updateSuggestedTerms: async ({
        sgId,
        keyword,
        sgtWord,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/suggest/${sgId}`, { keyword, sgtWord }),

    // 추천 검색어 삭제
    deleteSuggestedTerms: async (sgId: string) =>
        await api.delete(`manage/suggest/${sgId}`),

    // 추천 검색어 적용
    postSuggestedTermsUpdate: async () =>
        await api.post(`manage/suggest_update`),
}
