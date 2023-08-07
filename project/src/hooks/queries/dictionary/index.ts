import { CACHE_KEYS } from '@constants/cacheKeys'
import { useModal } from '@hooks/common/Modal/useModal'
import { dictionaryApis } from '@services/dictionary'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

//queries
export const dictionaryQueries = {
    // 사용자 사전 불러오기
    useGetUserDicitonary: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.userDictionary(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await dictionaryApis.getUserDicitonary(params)

                return data
            },

            onError: () => {},
        })
    },
    // 사용자 단일어 사전 불러오기
    useGetUserSingleWordDictionary: (params: CommonRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.userSingleWordDictionary(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await dictionaryApis.getUserSingleWordDictionary(params)
                console.log('data:', data)
                return data
            },
            // enabled: !!params.keyword,
            onError: () => {},
        })
    },

    // 동의어 사전 불러오기
    useGetSynonymDictionary: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.synonymDictionary(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await dictionaryApis.getSynonymDictionary(params)
                console.log('data', data)

                return data
            },
            onError: () => {},
        })
    },
    // 금칙어 사전 불러오기
    useGetForbiddenDictionary: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.forbiddenDictionary(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await dictionaryApis.getForbiddenDictionary(params)
                return data
            },
            onError: () => {},
        })
    },
}

//mutations
export const dictionaryMutations = {
    // 사용자 사전
    usePostUserSingleWordDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async ({ keyword }: KeywordMutationRequestType) => {
                return await dictionaryApis.postUserSingleWordDictionary({
                    keyword,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.userDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },

    usePostUserMultipleWordDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async ({
                keyword,
                rgisWord,
            }: KeywordMutationRequestType) => {
                return await dictionaryApis.postUserMultipleWordDictionary({
                    keyword,
                    rgisWord,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.userDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },

    useUpdateUserDictionary: () => {
        return useMutation({
            mutationFn: async ({
                customDictId,
                keyword,
                rgisWord,
            }: KeywordMutationRequestType) => {
                return await dictionaryApis.updateUserDictionary({
                    customDictId,
                    keyword,
                    rgisWord,
                })
            },
            onSuccess: () => {},
            onError: (error: onErrorType) => {},
        })
    },
    useDeleteUserDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()
        return useMutation({
            mutationFn: async (customDictId: string) => {
                return await dictionaryApis.deleteUserDictionary(customDictId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.userDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },
    // 동의어
    usePostSynonymDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async ({
                keyword,
                synomWord,
            }: KeywordMutationRequestType) => {
                return await dictionaryApis.postSynonymDictionary({
                    keyword,
                    synomWord,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.synonymDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },
    useUpdateSynonymDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async (params: KeywordMutationRequestType) => {
                return await dictionaryApis.updateSynonymDictionary(params)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.synonymDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },
    useDeleteSynonymDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async (synomDictId: string) => {
                return await dictionaryApis.deleteSynonymDictionary(synomDictId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.synonymDictionary({})],
                })
                closeModal()
            },
            onError: () => {},
        })
    },
    // 금칙어
    usePostForbiddenDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()
        return useMutation({
            mutationFn: async ({ keyword }: KeywordMutationRequestType) => {
                return await dictionaryApis.postForbiddenDictionary({
                    keyword,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.forbiddenDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },

    useUpdateForbiddenDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()
        return useMutation({
            mutationFn: async ({
                id,
                stopword,
            }: {
                id: string
                stopword: string
            }) => {
                return await dictionaryApis.updateForbiddenDictionary({
                    id,
                    stopword,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.forbiddenDictionary({})],
                })
                closeModal()
            },
            onError: () => {},
        })
    },
    useDeleteForbiddenDictionary: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async (stwdDictId: string) => {
                return await dictionaryApis.deleteForbiddenDictionary(
                    stwdDictId
                )
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.forbiddenDictionary({})],
                })
                closeModal()
            },
            onError: (error: onErrorType) => {},
        })
    },

    // 사전 업데이트
    usePostDictionaryUpdate: () => {
        return useMutation({
            mutationFn: async () => {
                return await dictionaryApis.postDictionaryUpdate()
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
}
