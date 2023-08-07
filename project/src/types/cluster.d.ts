export interface clusterTotalType {
    status: string
    nodes: number
    indices: number
    memory: {
        now: number
        max: number
    }
    shards: number
    unsigned: number
    documents: number
    databases: number
}

export interface clusterChartDataType {
    [key: Date]: number
}
