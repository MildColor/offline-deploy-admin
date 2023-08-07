import api from '../api/api'

export const statisticsApis = {
    // 검색 추이 불러오기
    getSearchTrend: async (params: StatisticsRequestType) =>
        await api.get(`elastic/stat/trend`, { params }),

    // 인기 검색어 불러오기 (Top Query)
    getTopQuery: async (params: StatisticsRequestType) =>
        await api.get(`elastic/stat/top`, { params }),

    // Zero Query 불러오기
    getZeroQuery: async (params: StatisticsRequestType) =>
        await api.get(`elastic/stat/zero`, { params }),
}
