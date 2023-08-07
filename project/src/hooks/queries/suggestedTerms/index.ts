import { CACHE_KEYS } from '@constants/cacheKeys'
import { useModal } from '@hooks/common/Modal/useModal'
import { suggestedTermsApis } from '@services/suggestedTerms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const suggestedTermsQueries = {
    // GET /api/v1/manage/suggest
    useGetSuggestedTerms: ({ search, page, sort, order }: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.suggestedTerms({ search, page, sort, order })],
            queryFn: async () => {
                const { 
                    data: {
                        data: {items},
                    },
                } = await suggestedTermsApis.getSuggestedTerms({
                    search,
                    page,
                    sort,
                    order,
                })

                return items;
            },
            onError: () => {},
        })
    },
    // GET /api/v1/manage/suggest/{sgId}
    useGetSuggestedTermsById: ({ sgId }: CommonRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.suggestedTermsById({ sgId })],
            queryFn: async () => {
                const { data } = await suggestedTermsApis.getSuggestedTermsById({ sgId })

                return data;
            },
            onError: () => {},
        })
    },
}

export const suggestedTermsMutations = {
    // POST /api/v1/manage/suggest
    usePostSuggestedTerms: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async ({ keyword, sgtWord, }: KeywordMutationRequestType) => {
                return await suggestedTermsApis.postSuggestedTerms({
                    keyword,
                    sgtWord,
                })
            },
            onSuccess: () => {
                closeModal();
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.suggestedTerms()]
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST /api/v1/manage/suggest/{sgId}
    useUpdateSuggestedTerms: () => {
        const { closeModal } = useModal();

        return useMutation({
            mutationFn: async ({ sgId, keyword, sgtWord, }: KeywordMutationRequestType) => {
                return await suggestedTermsApis.updateSuggestedTerms({
                    sgId,
                    keyword,
                    sgtWord,
                })
            },
            onSuccess: () => {
                closeModal();
            },
            onError: (error: onErrorType) => {},
        })
    },
    // DELETE /api/v1/manage/suggest/{sgId}
    useDeleteSuggestedTerms: () => {
        const { closeModal } = useModal();
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async (sgId: string) => {
                return await suggestedTermsApis.deleteSuggestedTerms(sgId)
            },
            onSuccess: () => {
                closeModal();
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.suggestedTerms()]
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST /api/v1/elastic/suggest
    usePostSuggestedTermsUpdate: () => {
        return useMutation({
            mutationFn: async () => {
                return await suggestedTermsApis.postSuggestedTermsUpdate()
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
}
