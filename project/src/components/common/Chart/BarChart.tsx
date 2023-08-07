import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            align: 'start' as const,
        },
        title: {
            display: true,
            text: '검색어 통계',
            align: 'start' as const,
            font: { size: 18 },
        },
    },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const faker = [123, 543, 455, 948, 4954, 123, 439]
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map((item, idx) => faker[idx]),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map((item, idx) => faker[idx]),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
}

export function BarChart() {
    return <Bar options={options} data={data} />
}

export default BarChart
