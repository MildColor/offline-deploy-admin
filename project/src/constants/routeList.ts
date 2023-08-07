import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

export interface RouteItems {
    main: {
        NAME: string
        PATH?: string
        icon?: IconDefinition
        desc?: string
    }
    sub: {
        NAME: string
        PATH: string
    }[]
}

export const routeList: RouteItems[] = [
    // { main: { NAME: '홈', PATH: '/', icon: faHouse }, sub: [] },
    { main: { NAME: '대시보드', PATH: '/dashboard', icon: faHouse }, sub: [] },
    {
        main: { NAME: '클러스터', PATH: '/cluster', icon: faChartPie },
        sub: [{ NAME: '개요', PATH: '/summary' }],
    },
    {
        main: { NAME: '통계', PATH: '/statistic', icon: faCloud },
        sub: [
            { NAME: '검색 추이', PATH: '/search-trend' },
            { NAME: '검색어 통계', PATH: '/search-term-statistic' },
        ],
    },
    {
        main: {
            NAME: '검색',
            PATH: '/search',
            icon: faMagnifyingGlass,
            desc: '검색을 효율적으로 하기 위해 검색어를 관리할 수 있습니다.',
        },
        sub: [
            { NAME: '인기 검색어', PATH: '/popular-terms' },
            { NAME: '추천 검색어', PATH: '/suggested-terms' },
            { NAME: '카테고리 부스팅', PATH: '/category-boosting' },
        ],
    },
    {
        main: {
            NAME: '색인',
            PATH: '/index',
            icon: faFolder,
            desc: '현재 색인된 인덱스 정보를 확인 할 수 있습니다.',
        },
        sub: [{ NAME: '데이터 색인 관리', PATH: '/management/0' }],
    },
    {
        main: {
            NAME: '사전',
            PATH: '/dictionary',
            icon: faBook,
            desc: '사전을 관리할 수 있습니다.',
        },
        sub: [
            { NAME: '사전 관리', PATH: '/management/korean' },
            { NAME: '자동 완성', PATH: '/autocomplete' },
            { NAME: '오타 교정', PATH: '/typo-correction' },
        ],
    },
    {
        main: {
            NAME: '시스템',
            PATH: '/system',
            icon: faGear,
            desc: '관리자 페이지의 시스템을 설정할 수 있습니다.',
        },
        sub: [{ NAME: '사용자 관리', PATH: '/user-management' }],
    },
]
