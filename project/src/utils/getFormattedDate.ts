const getFormattedDate = () => {
    const currentTime = new Date()
    const [year, month, day, hour, minute, second] = [
        currentTime.getFullYear(),
        String(currentTime.getMonth() + 1).padStart(2, '0'),
        String(currentTime.getDate()).padStart(2, '0'),
        String(currentTime.getHours()).padStart(2, '0'),
        String(currentTime.getMinutes()).padStart(2, '0'),
        String(currentTime.getSeconds()).padStart(2, '0'),
    ]

    return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}

export default getFormattedDate
