import api from '../api/api'

export const userApis = {
    // 로그인
    signIn: async ({ id, password }: SignInForm) =>
        await api.post(`users/login`, { id, password }),

    // 사용자 등록
    signUp: async ({ id, password, username, email, status }: SignUpForm) =>
        await api.post(`users`, {
            id,
            username,
            email,
            password,
            status,
        }),

    // 로그아웃
    signOut: async () => {
        await api.post(`users/logout`)
    },

    // 사용자 목록 불러오기
    getUsers: async (params: ListRequestType) =>
        await api.get(`users`, { params }),

    // 사용자 정보 조회
    getUserById: async ({ userId }: { userId: string }) =>
        await api.get(`users/${userId}`),

    // 사용자 수정
    updateUser: async ({
        id,
        userId,
        password,
        username,
        email,
        status,
    }: UpdateUserForm) =>
        await api.post(`users/${userId}`, {
            id,
            email,
            username,
            status,
            password,
        }),

    // 사용자 삭제
    deleteUser: async (id: string) => await api.delete(`users/${id}`),
}
