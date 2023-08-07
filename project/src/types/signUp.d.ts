interface SignUpForm extends SignInForm {
    username: string
    email: string
    status: string
}

interface UpdateUserForm extends SignUpForm {
    userId: string
}
