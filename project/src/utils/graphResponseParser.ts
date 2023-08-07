type GraphDataItem = {
    [key: string]: any
}

type DatasetItem = {
    label: string
    data?: number[] // 데이터는 number 배열 또는 undefined가 될 수 있습니다.
    borderColor: string
    backgroundColor: string
}

function graphResponseParser(
    datasets: DatasetItem[],
    data: GraphDataItem[]
): {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor: string
        backgroundColor: string
    }[]
} {
    const labels: string[] = data
        .filter((item) => item.date !== undefined)
        .map((item) => item.date)

    // data 배열에서 'date' 프로퍼티를 제외한 키들을 추출
    const dataKeys = Object.keys(data[0]).filter((key) => key !== 'date')

    // dataKeys에 해당하는 데이터만 추출하여 datasets의 data에 할당
    const processedDatasets = datasets.map((dataset) => ({
        ...dataset,
        data: data
            .filter((item) => item.date !== undefined) // date가 undefined인 경우 필터링
            .map((item) => item[dataKeys.find((key) => key in item) || '']), // 해당 키 값으로 필터링 후 배열로 만들어 datasets의 data에 할당
    }))

    return { labels, datasets: processedDatasets }
}

export default graphResponseParser
