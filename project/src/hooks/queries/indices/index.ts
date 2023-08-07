import { CACHE_KEYS } from '@constants/cacheKeys'
import { indicesApis } from '@services/indices'
import { useQuery } from '@tanstack/react-query'

export const indicesQueries = {
    // 인덱스 정보 불러오기
    useGetIndices: ({ search, page }: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.indices({ search, page })],
            queryFn: async () => {
                const { data } = await indicesApis.getIndices({ search, page })
                return data
            },
            onError: () => {},
        })
    },
    // 인덱스 정보 조회
    useGetIndicesDetail: (index_name: string) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.indicesDetail(index_name)],
            queryFn: async () => {
                const { data } = await indicesApis.getIndicesDetail(index_name)
                return data
            },
            onError: () => {},
        })
    },
}
