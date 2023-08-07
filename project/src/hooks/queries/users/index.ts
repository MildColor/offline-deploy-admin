import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CACHE_KEYS } from '@constants/cacheKeys'
import { userApis } from '@services/users'
import { setLocalStorage } from '@utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN_KEY } from '@constants/token'
import { PAGE_PATH } from '@constants/path'
import { useModal } from '@hooks/common/Modal/useModal'

export const usersQueries = {
    useGetUsers: (params: ListRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.users(params)],
            queryFn: async () => {
                console.log('params: ' + JSON.stringify(params))

                const {
                    data: {
                        data: { items },
                    },
                } = await userApis.getUsers(params)

                return items
            },
            onError: () => {},
        })
    },
    useGetUserById: (params: { userId: string }) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.user(params)],
            queryFn: async () => {
                console.log('params: ' + JSON.stringify(params))

                const {
                    data: { data },
                } = await userApis.getUserById(params)

                return data
            },
            onError: () => {},
        })
    },
}

export const usersMutations = {
    useSignIn: () => {
        const navigate = useNavigate()
        return useMutation({
            mutationFn: async (params: SignInForm) => {
                return await userApis.signIn(params)
            },
            onSuccess: (res) => {
                const {
                    data: {
                        data: { accessToken },
                    },
                } = res

                setLocalStorage(ACCESS_TOKEN_KEY, accessToken)
                navigate('/' + PAGE_PATH.DASH_BOARD)
            },
            onError: (error: onErrorType) => {},
        })
    },

    useSignUp: () => {
        const { closeModal } = useModal()
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: async (params: SignUpForm) => {
                return await userApis.signUp(params)
            },
            onSuccess: () => {
                closeModal()
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.users()],
                })
            },
            onError: (error: onErrorType) => {},
        })
    },

    useUpdateUser: () => {
        const { closeModal } = useModal()
        return useMutation({
            mutationFn: async (params: UpdateUserForm) => {
                return await userApis.updateUser(params)
            },
            onSuccess: () => {
                closeModal()
            },
            onError: () => {},
        })
    },

    useDeleteUser: () => {
        const queryClient = useQueryClient()
        const { closeModal } = useModal()

        return useMutation({
            mutationFn: async (id: string) => {
                return await userApis.deleteUser(id)
            },

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [...CACHE_KEYS.users()],
                })

                closeModal()
            },
            onError: (error: onErrorType) => {
                console.log('deleteUser Error', error)
            },
        })
    },
}
