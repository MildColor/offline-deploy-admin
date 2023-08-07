import api from '../api/api'

export const typoCorrectionApis = {
    //오타교정 불러오기
    getTypoCorreciton: async ({ page, sort, order, search }: ListRequestType) =>
        await api.get(`manage/typo?page=${page}&sort=${sort}&order=${order}&search=${search}`),

    // 오타교정 등록
    postTypoCorreciton: async ({
        keyword,
        trfKeyword,
        weightedVal,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/typo`, { keyword, trfKeyword, weightedVal }),

    //오타교정 id로 불러오기
    getTypoCorrecitonById: async ({ mtId }: CommonRequestType) =>
        await api.get(`manage/typo/${mtId}`),

    // 오타교정 수정
    updateTypoCorreciton: async ({
        mtId,
        keyword,
        trfKeyword,
        weightedVal,
    }: KeywordMutationRequestType) =>
        await api.post(`manage/typo/${mtId}`, {
            keyword,
            trfKeyword,
            weightedVal,
        }),

    // 오타교정 삭제
    deleteTypoCorreciton: async (mtId: number) =>
        await api.delete(`manage/typo/${mtId}`),

    // 오타교정 적용
    postTypoCorrectionUpdate: async () => await api.post(`typo_update`),
}
