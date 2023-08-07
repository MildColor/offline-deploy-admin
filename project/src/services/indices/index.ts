import api from '../api/api'

export const indicesApis = {
    // 인덱스 정보 불러오기
    getIndices: async ({ search, page }: ListRequestType) =>
        await api.get(`indices?search=${search}&page=${page}`),

    // 인덱스 정보 조회
    getIndicesDetail: async (index_name: string) =>
        await api.get(`indices/${index_name}`),
}
