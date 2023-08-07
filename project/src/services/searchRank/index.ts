import { searchRankMutationType } from '../../types/searchRank'
import api from '../api/api'

export const searchRankApis = {
    // 검색 순위 조정 검색
    getRank: async ({ search, page }: ListRequestType) =>
        await api.get(`manage/rank?search=${search}&page=${page}`),
    // 상위 고정/해제
    updateRankHigh: async ({ docId, high }: searchRankMutationType) =>
        await api.put(`manage/rank/${docId}`, { high }),

    // 숨기기/해제
    updateRankHide: async ({ docId, hide }: searchRankMutationType) =>
        await api.put(`manage/rank/${docId}`, { hide }),

    // 검색 순위 적용
    postRankUpdate: async () => await api.put(`manage/rank_update`),
}
