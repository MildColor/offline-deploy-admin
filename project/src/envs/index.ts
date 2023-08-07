export type AppEnv = 'production' | 'development'

export const getAppEnv = (): AppEnv =>
    (process.env.REACT_APP_BASE_URL as Exclude<AppEnv, 'development'>) ||
    'development'

// export const getApiEndpoint = () => {
//     switch (getAppEnv()) {
//         case 'production':
//             return 'api/v1/'
//         case 'development':
//             return 'api/v1/'
//         default:
//             return ''
//     }
// }

// export const getDomainName = () => {
//     switch (getAppEnv()) {
//         case 'production':
//             return '' // TODO: 추후 프로덕션 도메인으로 변경
//         case 'development':
//         default:
//             return 'http://localhost:3000'
//     }
// }
