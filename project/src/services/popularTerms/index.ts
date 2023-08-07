import api from '../api/api'

export const popularTermsApi = {
    // 우선 적용 검색어 리스트 불러오기
    getOverridingSearchTerms: async ({ search, page }: ListRequestType) =>
        await api.get(`manage/popular/first?search=${search}&page=${page}`),
    
    // 우선 적용 검색어 id로 불러오기
    getOverridingSearchTermsById: async ({ pfId }: { pfId: string }) =>
        await api.get(`manage/popular/first/${pfId}`),

    // 우선 적용 검색어 등록
    postOverridingSearchTerms: async ({
        keyword,
        rank,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/popular/first`, { keyword, rank }),

    // 우선 적용 검색어 등록
    postOverridingSearchTermsByRank: async ({
        keyword,
        rank,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/popular/first/rank`, { keyword, rank }),

    // 우선 적용 검색어 수정
    updateOverridingSearchTerms: async ({
        pfId,
        keyword,
        rank,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/popular/first/${pfId}`, { keyword, rank }),

    // 우선 적용 검색어 삭제
    deleteOverridingSearchTerms: async (pfId: string) =>
        await api.delete(`manage/popular/first/${pfId}`),
    //

    // 제외 검색어 리스트로 불러오기
    getHideSearchTerms: async ({ search, page }: ListRequestType) =>
        await api.get(`manage/popular/hide?search=${search}&page=${page}`),
    // 제외 검색어 ID로 불러오기
    getHideSearchTermsById: async ({ phId }: { phId?: string }) =>
        await api.get(`manage/popular/hide/${phId}`),

    // 제외 검색어 등록
    postHideSearchTerms: async ({ keyword }: KeywordMutationRequestType) =>
        await api.post(`manage/popular/hide`, { keyword }),

    // 제외 검색어 수정
    updateHideSearchTerms: async ({
        phId,
        keyword,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/popular/hide/${phId}`, { keyword }),

    // 제외 검색어 삭제
    deleteHideSearchTerms: async (phId: string) =>
        await api.delete(`manage/popular/hide/${phId}`),


    // 인기 검색어 적용
    postPopularSearchTermsUpdate: async () =>
        await api.post(`elastic/popular`),
}
