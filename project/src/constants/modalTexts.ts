interface modalDataType {
    [key: string]: {
        [key: string]: {
            title: string | ((title: string) => string)
            subTitle: string
            width?: string
            height?: string
            callback?: () => void
        }
    }
}

export const modal: modalDataType = {
    Search: {
        RegisterOverridingSearchTerms: {
            title: '우선 적용 검색어 등록',
            subTitle: '인기 검색어에서 우선으로 적용할 단어를 등록합니다.',
            width: '50rem',
            height: '',
            callback: () => console.log('RegisterOverridingSearchTerms'),
        },
        EditingOverridingSearchTerms: {
            title: '우선 적용 검색어 수정',
            subTitle: '인기 검색어에서 우선으로 적용할 단어를 수정합니다.',
            callback: () => console.log('EditingOverridingSearchTerms'),
        },
        RegisterRecommendedSearchTerms: {
            title: '추천 검색어 등록',
            subTitle:
                '추천 검색어를 수정합니다. 추천 검색어가 우선으로 출력되고 그 다음 연관 검색어가 출력됩니다.',
            height: '37rem',
            callback: () => console.log('RegisterRecommendedSearchTerms'),
        },
        EditingRecommendedSearchTerms: {
            title: '추천 검색어 수정',
            subTitle:
                '추천 검색어를 등록합니다(최대 5개), 추천 검색어가 우선으로 출력되고 그 다음 연관 검색어가 출력됩니다.',
            width: '50rem',
            height: '37rem',
            callback: () => console.log('EditingRecommendedSearchTerms'),
        },
        RegisterHideSearchTerms: {
            title: '제외 검색어 등록',
            subTitle: '인기 검색어 순위에서 제외할 단어를 설정합니다.',
            callback: () => console.log('RegisterHideSearchTerms'),
        },
        EditingHideSearchTerms: {
            title: '제외 검색어 수정',
            subTitle: '인기 검색어 순위에서 제외할 단어를 수정합니다.',
            width: '50rem',
            height: '',
            callback: () => console.log('EditingHideSearchTerms'),
        },
    },
    Index: {
        IndexDetail: {
            title: (title: string) => {
                return title
            },
            subTitle: '',
            callback: () => console.log('IndexDetail'),
        },
    },

    Dictionary: {
        RegisterUserDictionaryTerms: {
            title: '사용자 사전 관리 단어 등록',
            subTitle: '단일어의 데이터를 등록합니다.',
            width: '50rem',
            height: '',
            callback: () => console.log('RegisterUserDictionaryTerms'),
        },
        DetailUserDictionaryTerms: {
            title: '사용자 사전 관리 단어 상세',
            subTitle: '',

            width: '50rem',
            height: '',
            callback: () => console.log('DetailUserDictionaryTerms'),
        },
        RegisterSynonymTerms: {
            title: '동의어 단어 등록',
            subTitle: '같은 의미의 단어를 등록합니다.',
            width: '40rem',
            height: '',
            callback: () => console.log('RegisterSynonymWords'),
        },
        SynonymDetailedManagement: {
            title: '동의어 관리 단어 상세',
            subTitle: '',
            width: '40rem',
            height: '',
            callback: () => console.log('SynonymDetailedManagement'),
        },
        RegisterForbiddenTerms: {
            title: '금칙어 단어 등록',
            subTitle:
                '검색에서 제외하고자 하는 단어를 등록합니다. (한 단어 씩 등록가능)',

            width: '40rem',
            height: '30rem',
            callback: () => console.log('RegisterForbiddenTerms'),
        },
        ForbiddenTermsDetailManagement: {
            title: '금칙어 관리 단어 상세',
            subTitle: '',
            width: '40rem',
            height: '',
            callback: () => console.log('ForbiddenTermsDetailManagement'),
        },
        RegisterAutocompleteKeyword: {
            title: '자동완성 키워드 등록',
            subTitle: '',
            width: '50rem',
            height: '28rem',
            callback: () => console.log('ForbiddenTermsDetailManagement'),
        },
        AutocompleteKeywordDetailManagement: {
            title: '자동완성 키워드 상세',
            subTitle: '',
            width: '50rem',
            height: '',
            callback: () => console.log('AutocompleteKeywordDetailManagement'),
        },
        TypoCorrectionKeywordRegistration: {
            title: '오타교정 키워드 등록',
            subTitle: '',
            width: '50rem',
            height: '',
            callback: () => console.log('TypoCorrectionKeywordRegistration'),
        },
        TypoCorrectionKeywordDetailManagement: {
            title: '오타교정 키워드 상세',
            subTitle: '',
            height: '',
            callback: () =>
                console.log('TypoCorrectionKeywordDetailManagement'),
        },
    },
    System: {
        UserRegistration: {
            title: '사용자 등록',
            subTitle: '',
            width: '50rem',
            height: '',
            callback: () => console.log('UserRegistration'),
        },
        UserDetailManagement: {
            title: '사용자 정보 상세',
            subTitle: '',
            width: '50rem',
            height: '',
            callback: () => console.log('UserDetailManagement'),
        },
    },
}
