import { CACHE_KEYS } from '@constants/cacheKeys'
import { clusterApis } from '@services/cluster'
import { useQuery } from '@tanstack/react-query'

export const clusterQueries = {
    // 클러스터 데이터 불러오기
    useGetClusterTotal: () => {
        return useQuery({
            queryKey: [...CACHE_KEYS.clusterTotal],
            queryFn: async () => {
                const { data } = await clusterApis.getClusterTotal()
                return data
            },
            onError: () => {},
        })
    },
    // 검색 속도 데이터 불러오기
    useGetClusterSearchRate: () => {
        return useQuery({
            queryKey: [...CACHE_KEYS.clusterSearchRate],
            queryFn: async () => {
                const { data } = await clusterApis.getClusterSearchRate()
                return data
            },
            onError: () => {},
        })
    },
    // 검색 지연도 데이터 불러오기

    useGetClusterSearchLatency: () => {
        return useQuery({
            queryKey: [...CACHE_KEYS.clusterSearchLatency],
            queryFn: async () => {
                const { data } = await clusterApis.getClusterSearchLatency()
                return data
            },
            onError: () => {},
        })
    },
    // 색인 속도 데이터 불러오기
    useGetClusterIndexingRate: () => {
        return useQuery({
            queryKey: [...CACHE_KEYS.clusterIndexingRate],
            queryFn: async () => {
                const { data } = await clusterApis.getClusterIndexingRate()
                return data
            },
            onError: () => {},
        })
    },
    // 색인 지연도 데이터 불러오기
    useGetClusterIndexingLatency: () => {
        return useQuery({
            queryKey: [...CACHE_KEYS.clusterIndexingLatency],
            queryFn: async () => {
                const { data } = await clusterApis.getClusterIndexingLatency()
                return data
            },
            onError: () => {},
        })
    },
}
