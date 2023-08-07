import React, { ChangeEvent, FormEvent, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import {
    CheckBoxInput,
    Input,
    LabelInput,
} from '@components/common/Input/Input'
import Label from '@components/common/Label/Label'
import { useForm } from '@hooks/common/Form/useForm'
import { usersMutations } from '@hooks/queries/users'

function UserRegistration() {
    const { mutate } = usersMutations.useSignUp()

    const [state, onChange, setState] = useForm({
        id: '',
        username: '',
        email: '',
        password: '',
        status: 'N',
    })
    const [errorMsg, setErrorMsg] = useState('')

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        const status = checked ? 'Y' : 'N'
        setState({ ...state, [name]: status })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { id, password } = state

        if (!id || !password) return

        mutate(state, {
            onError: (error: onErrorType) => {
                const {
                    data: {
                        data: { errorCode },
                    },
                } = error.response

                setErrorMsg(errorCode)
            },
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <LabelInput
                    labelText="아이디"
                    name="id"
                    important={true}
                    required={true}
                    onChange={onChange}
                    value={state.id}
                />
                <LabelInput
                    labelText="성명"
                    name="username"
                    onChange={onChange}
                    value={state.username}
                />
                <LabelInput
                    labelText="이메일"
                    type="email"
                    name="email"
                    onChange={onChange}
                    value={state.email}
                />
                <LabelInput
                    labelText="패스워드"
                    important={true}
                    name="password"
                    type="password"
                    required={true}
                    onChange={onChange}
                    value={state.password}
                />
                <BoardFrame margin="1rem 0">
                    <Label width="15rem" textLineHeight="2.4rem" height="2rem">
                        상태<span className="importantSpan">*</span>
                    </Label>
                    <CheckBoxInput
                        labelText={state.status === 'N' ? '사용' : '사용안함'}
                        width="10rem"
                        name="status"
                        onChange={handleChangeCheckbox}
                        checked={state.status === 'N' ? true : false}
                    />
                </BoardFrame>
                {errorMsg && (
                    <BoardFrame variant="warning" margin="0.5rem 0">
                        {errorMsg}
                    </BoardFrame>
                )}

                <BoardFrame margin="1rem 0" justifyContent="center">
                    <Button variant="normal" type="submit">
                        등록
                    </Button>
                </BoardFrame>
            </form>
        </>
    )
}

export default UserRegistration
