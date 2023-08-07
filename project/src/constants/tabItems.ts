import DetailMapping from '@components/Index/Modal/IndexDetail/DetailMapping'
import DetailSetting from '@components/Index/Modal/IndexDetail/DetailSetting'
import DetailSummary from '@components/Index/Modal/IndexDetail/DetailSummary'

export interface TabItem {
    id: string
    label: string
    component?: React.ReactNode
}

export const IndexTabItems: TabItem[] = [
    {
        id: 'summary',
        label: 'Summary',
        component: DetailSummary(),
    },
    {
        id: 'settings',
        label: 'Settings',
        component: DetailSetting(),
    },
    {
        id: 'mappings',
        label: 'Mappings',
        component: DetailMapping(),
    },
]

export const dictionaryTabItems: TabItem[] = [
    {
        id: 'korean',
        label: '한국어',
    },
    {
        id: 'english',
        label: '영어',
    },
    {
        id: 'japanese',
        label: '일본어',
    },
    {
        id: 'chinese',
        label: '중국어',
    },
]
