function checkEmptyObject<T extends Object>(params: T) {
    const isEmpty = Object.values(params).every((param) => !param)
    return isEmpty
}

export default checkEmptyObject
