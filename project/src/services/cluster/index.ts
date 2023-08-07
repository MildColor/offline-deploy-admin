import api from '../api/api'

export const clusterApis = {
    // 클러스터 데이터 불러오기
    getClusterTotal: async () => await api.get(`cluster/total`),

    // 검색 속도 데이터 불러오기
    getClusterSearchRate: async () => await api.get(`cluster/search_rate`),

    // 검색 지연도 데이터 불러오기
    getClusterSearchLatency: async () =>
        await api.get(`cluster/search_latency`),

    // 색인 속도 데이터 불러오기
    getClusterIndexingRate: async () => await api.get(`cluster/indexing_rate`),

    // 색인 지연도 데이터 불러오기
    getClusterIndexingLatency: async () =>
        await api.get(`cluster/indexing_latency`),
}
