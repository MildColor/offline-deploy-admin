import { CACHE_KEYS } from '@constants/cacheKeys'
import { useModal } from '@hooks/common/Modal/useModal'
import { popularTermsApi } from '@services/popularTerms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const popularTermsQueries = {
    // GET /api/manage/popular/first
    useGetOverridingSearchTerms: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.overridingSearchTerms(params)],
            queryFn: async () => {
                const { 
                    data: {
                        data: { items },
                    },
                } = await popularTermsApi.getOverridingSearchTerms(params)
                
                return items
            },
            onError: () => {},
        })
    },
    // GET /api/manage/popular/first/{pfId}
    useGetOverridingSearchTermsById: (params: { pfId: string }) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.overridingSearchTermsById(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await popularTermsApi.getOverridingSearchTermsById(params)
                
                return data
            },
            onError: () => {},
        })
    },

    // GET /api/manage/popular/hide
    useGetHideSearchTerms: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.hideSearchTerms(params)],
            queryFn: async () => {
                const { 
                    data: {
                        data: { items },
                    },
                } = await popularTermsApi.getHideSearchTerms(params)
                
                return items
            },
            onError: () => {},
        })
    },
    // GET /api/manage/popular/hide/{phId}
    useGetHideSearchTermsById: (params: { phId: string }) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.hideSearchTermsById(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await popularTermsApi.getHideSearchTermsById(params)
                return data
            },
            onError: () => {},
        })
    },
}

export const popularTermsMutations = {
    // POST /api/manage/popular/first
    usePostOverridingSearchTerms: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await popularTermsApi.postOverridingSearchTerms(params)
            },
            onSuccess: () => {
                closeModal();
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.overridingSearchTerms()]
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST /api/manage/popular/first/rank
    usePostOverridingSearchTermsByRank: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await popularTermsApi.postOverridingSearchTermsByRank(params)
            },
            onSuccess: () => {
                closeModal();
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.overridingSearchTerms()]
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST /api/manage/popular/first/{pfId}
    useUpdateOverridingSearchTerms: () => {
        const { closeModal } = useModal();

        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await popularTermsApi.updateOverridingSearchTerms(params)
            },
            onSuccess: () => {
                closeModal();
            },
            onError: (error: onErrorType) => {},
        })
    },
    // DELETE /api/manage/popular/first/{pfId}
    useDeleteOverridingSearchTerms: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async (pfId: string) => {
                return await popularTermsApi.deleteOverridingSearchTerms(pfId)
            },
            onSuccess: () => {
                closeModal();
                return queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.overridingSearchTerms()]
                })
            },
            onError: (error: onErrorType) => {},
        })
    },

    // POST /api/manage/popular/hide
    usePostHideSearchTerms: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await popularTermsApi.postHideSearchTerms(params)
            },
            onSuccess: () => {
                closeModal();
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.hideSearchTerms()]
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST /api/manage/popular/hide/{phId}
    useUpdateHideSearchTerms: () => {
        const { closeModal } = useModal();

        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await popularTermsApi.updateHideSearchTerms(params)
            },
            onSuccess: () => {
                closeModal();
            },
            onError: (error: onErrorType) => {},
        })
    },
    // DELETE /api/manage/popular/hide/{phId}
    useDeleteHideSearchTerms: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();
        
        return useMutation({
            mutationFn: async (phId: string) => {
                return await popularTermsApi.deleteHideSearchTerms(phId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["getOverridingSearchTerms"]
                })
                closeModal();
            },
            onError: (error: onErrorType) => {},
        })
    },

    // POST /api/elastic/popular
    usePostPopularSearchTermsUpdate: () => {
        return useMutation({
            mutationFn: async () => {
                return await popularTermsApi.postPopularSearchTermsUpdate()
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
}
