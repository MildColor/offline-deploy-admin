import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// const faker = [432, 348, 129, 485, 32, 999, 332]
// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map((item, idx) => faker[idx]),
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map((item, idx) => faker[idx] + 30),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// }

interface LineChartPropsType {
    title: string
    data: {
        labels: string[]
        datasets: {
            label: string
            data: number[]
            borderColor: string
            backgroundColor: string
        }[]
    }
}

function LineChart({ title, data }: LineChartPropsType) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'start' as const,
                labels: {
                    boxHeight: 1,
                },
            },
            title: {
                display: true,
                text: title,
                align: 'start' as const,
                font: { size: 18 },
            },
            layout: {},
        },
    }
    return <Line options={options} data={data} />
}

export default LineChart
