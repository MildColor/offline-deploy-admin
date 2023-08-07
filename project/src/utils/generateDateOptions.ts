function generateDateOptions(number: number) {
    const options: {
        value: { startDate: string; endDate: string }
        name: string
    }[] = []

    const today: Date = new Date() // 오늘 날짜

    for (let i = 0; i < number; i++) {
        const { startDate, endDate } = calculateDateRange(today, i + 1)
        const obj = {
            value: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
            },
            name: `지난 ${i + 1}주`,
        }
        options.push(obj)
    }

    return options
}

export function calculateDateRange(
    baseDate: Date,
    numWeeksAgo: number
): { startDate: Date; endDate: Date } {
    const oneWeek: number = 7 * 24 * 60 * 60 * 1000 // 1주일에 해당하는 밀리초
    const startDate: Date = new Date(baseDate.getTime() - numWeeksAgo * oneWeek) // startDate 계산
    const endDate: Date = new Date(baseDate.getTime()) // endDate 계산

    return { startDate, endDate }
}

export function formatDate(date: Date): string {
    const year: number = date.getFullYear()
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export default generateDateOptions
