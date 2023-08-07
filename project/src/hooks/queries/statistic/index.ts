import { useQuery } from '@tanstack/react-query'
import { CACHE_KEYS } from '@constants/cacheKeys'
import { statisticsApis } from '@services/statistic'
import graphResponseParser from '@utils/graphResponseParser'

export const statisticsQueries = {
    useGetSearchTrend: (params: StatisticsRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.searchTrend(params)],
            queryFn: async () => {
                const {
                    data: { data },
                } = await statisticsApis.getSearchTrend(params)

                return graphResponseParser(
                    [
                        {
                            label: 'Search Trend',
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                    data.trends
                )

                // return { labels: labels, datasets: datasets }
            },
            onError: () => {},
        })
    },
    useGetTopQuery: (params: StatisticsRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.topQuery(params)],
            queryFn: async () => {
                const { data } = await statisticsApis.getTopQuery(params)

                return data
            },
            onError: () => {},
        })
    },
    useGetZeroQuery: (params: StatisticsRequestType) => {
        return useQuery({
            queryKey: [...CACHE_KEYS.zeroQuery(params)],
            queryFn: async () => {
                const { data } = await statisticsApis.getZeroQuery(params)

                return data
            },
            onError: () => {},
        })
    },
}
