import { ACCESS_TOKEN_KEY } from '@constants/token'
import { getAppEnv } from '@envs/index'
import { getLocalStorage } from '@utils/localStorage'
import type { AxiosResponse } from 'axios'
import Axios, { AxiosError } from 'axios'
import httpStatus from 'http-status-codes'
// import humps from 'humps'

// import { refreshAccessToken } from 'services/auth'

// const { camelizeKeys } = humps

export const createApi = () => {
    const accessToken = getLocalStorage(ACCESS_TOKEN_KEY)

    const _api = Axios.create({
        baseURL: getAppEnv(),
        validateStatus: (status) =>
            status >= httpStatus.OK && status < httpStatus.BAD_REQUEST, // 200 ~ 399
        headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
    })

    _api.interceptors.response.use(
        // try
        (response) => {
            return response
        },
        // catch
        async (error) => {
            if (error instanceof AxiosError) {
                const errorStatus = error.response?.status ?? 0

                if (
                    [httpStatus.UNAUTHORIZED, httpStatus.FORBIDDEN].includes(
                        errorStatus
                    )
                ) {
                    // 리프레시 토큰이 없을 경우 로그인 페이지로 리다이렉트 시켜야 함
                    // if (getRefreshTokenFromCookie()) {
                    //     return refreshAccessToken(error, _api)
                    // }
                }
            }
            // 여기서 에러처리가 되면 때문에 swr의 전역 onError로 빠짐
            return Promise.reject(error)
        }
    )

    _api.interceptors.request.use((config) => {
        return config
    })

    return _api
}

const api = createApi()

export default api
