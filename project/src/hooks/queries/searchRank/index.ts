import { useMutation, useQuery } from '@tanstack/react-query'
import { searchRankMutationType } from '../../../types/searchRank'
import { CACHE_KEYS } from '@constants/cacheKeys'
import { searchRankApis } from '@services/searchRank'

// Queries
export const searchRankQueries = {
    useGetRank: ({ search, page }: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.rank({ search, page })],
            queryFn: async () => {
                const { data } = await searchRankApis.getRank({
                    search,
                    page,
                })

                return data
            },
            onError: () => {},
        })
    },
}

// Mutations
export const searchRankMutations = {
    useUpdateRankHigh: () => {
        return useMutation({
            mutationFn: async ({ docId, high }: searchRankMutationType) => {
                return await searchRankApis.updateRankHigh({
                    docId,
                    high,
                })
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
    useUpdateRankHide: () => {
        return useMutation({
            mutationFn: async ({ docId, hide }: searchRankMutationType) => {
                return await searchRankApis.updateRankHide({
                    docId,
                    hide,
                })
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
    usePostRankUpdate: () => {
        return useMutation({
            mutationFn: async () => {
                return await searchRankApis.postRankUpdate()
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
}
