import { CACHE_KEYS } from '@constants/cacheKeys'
import { useModal } from '@hooks/common/Modal/useModal'
import { autocompleteApis } from '@services/autocomplete'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const autocompeleteQueries = {
    useGetAutocompleteTerms: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.autocompeleteTerms(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await autocompleteApis.getAutocompleteTerms(params)
                return data
            },
            onError: () => {},
        })
    },
}

export const autocompeleteMutations = {
    usePostAutocompleteTerms: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async ({
                trfKeyword,
                keyword,
                weightedVal,
            }: AutoCompleteRegistrationType) => {
                return await autocompleteApis.postAutocompleteTerms({
                    trfKeyword,
                    keyword,
                    weightedVal,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.autocompeleteTerms()],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },

    useUpdateAutocompleteTerms: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()
        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await autocompleteApis.updateAutocompleteTerms(params)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.autocompeleteTerms()],
                })
                closeModal()
            },
            onError: () => {},
        })
    },

    useDeleteAutocompleteTerms: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async (id: string) => {
                return await autocompleteApis.deleteAutocompleteTerms(id)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.autocompeleteTerms()],
                })
                closeModal()
            },
            onError: () => {},
        })
    },
    usePostAutocompleteUpdate: () => {
        return useMutation({
            mutationFn: async (id: string) => {
                return await autocompleteApis.postAutocompleteUpdate()
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
}
