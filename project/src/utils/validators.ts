export const emailValidator = (email: string) => {
    const rule = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)
    const result = !rule.test(email.trim())
    return result
}

export const passwordValidator = (password: string) => {
    const result = password.trim().length <= 8
    return result
}

export const emptyStringValidator = (array: (string | number)[]) => {
    const hasEmptyString = array
        .map((v, _) => (typeof v === 'number' ? String(v).trim : v.trim()))
        .every((v) => v !== '')
    return hasEmptyString
}

export const passwordConfirmValidator = (
    password: string,
    passwordConfirm: string
) => {
    const trimemedPassword = password.trim()
    const trimemedPasswordConfirm = passwordConfirm.trim()

    if (trimemedPassword === '' || trimemedPasswordConfirm === '') return false

    return trimemedPassword === trimemedPasswordConfirm
}
