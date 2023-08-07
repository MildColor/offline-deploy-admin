import { searchRankApis } from './../../../services/searchRank/index'
import { CACHE_KEYS } from '@constants/cacheKeys'
import { useModal } from '@hooks/common/Modal/useModal'
import { typoCorrectionApis } from '@services/typoCorrection'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const typoCorrectionQueries = {
    // GET manage/typo
    useGetTypoCorreciton: ({ page, sort, order, search }: ListRequestType) => {
        return useQuery({
            queryKey: [
                ...CACHE_KEYS.typoCorreciton({ page, sort, order, search }),
            ],
            queryFn: async () => {
                const {
                    data: {
                        data: { items },
                    },
                } = await typoCorrectionApis.getTypoCorreciton({
                    page,
                    sort,
                    order,
                    search,
                })

                return items
            },
            onError: () => {},
        })
    },
    // GET manage/typo/${mtId}
    useGetTypoCorrecitonById: ({ mtId }: CommonRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.typoCorrecitonById({ mtId })],
            queryFn: async () => {
                const { data } = await typoCorrectionApis.getTypoCorrecitonById(
                    {
                        mtId,
                    }
                )

                return data
            },
            onError: () => {},
        })
    },
}

export const typoCorrectionMutations = {
    // POST manage/typo
    usePostTypoCorreciton: () => {
        const { closeModal } = useModal()
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: async ({
                keyword,
                trfKeyword,
                weightedVal,
            }: KeywordMutationRequestType) => {
                return await typoCorrectionApis.postTypoCorreciton({
                    keyword,
                    trfKeyword,
                    weightedVal,
                })
            },
            onSuccess: () => {
                closeModal()
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.typoCorreciton()],
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST manage/typo/${mtId}
    useUpdateTypoCorreciton: () => {
        const { closeModal } = useModal()
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: async ({
                mtId,
                keyword,
                trfKeyword,
                weightedVal,
            }: KeywordMutationRequestType) => {
                return await typoCorrectionApis.updateTypoCorreciton({
                    mtId,
                    keyword,
                    trfKeyword,
                    weightedVal,
                })
            },
            onSuccess: () => {
                closeModal()
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.typoCorreciton()],
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // DELETE manage/typo/${mtId}
    useDeleteTypoCorreciton: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async (mtId: number) => {
                return await typoCorrectionApis.deleteTypoCorreciton(mtId)
            },
            onSuccess: () => {
                closeModal()
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.typoCorreciton()],
                })
            },
            onError: (error: onErrorType) => {},
        })
    },
    // POST elastic/type
    usePostTypoCorrectionUpdate: () => {
        return useMutation({
            mutationFn: async () => {
                return await typoCorrectionApis.postTypoCorrectionUpdate()
            },
            onSuccess: () => {},
            onError: () => {},
        })
    },
}
