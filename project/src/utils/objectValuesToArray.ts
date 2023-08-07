export const objectValuesToArray = <T>(obj: {
    [key: string | number | symbol]: T
}): T[] => {
    return Object.values(obj)
}
