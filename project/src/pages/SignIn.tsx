import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components/common/Button/Button.styles'
import { CheckBoxInput, Input } from '@components/common/Input/Input'
import { absoluteCenter, flexColumn } from '@styles/mixins'
import { BoardFrame } from '@components/common/Board/Board'
import Logo from '@components/common/Logo/Logo'
import { useForm } from '@hooks/common/Form/useForm'
import { usersMutations } from '@hooks/queries/users'

function SignIn() {
    const [state, onChange] = useForm({ id: '', password: '' })
    const [errorMsg, setErrorMsg] = useState('')
    const { mutate } = usersMutations.useSignIn()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(state, {
            onError: (error: onErrorType) => {
                const { message } = error.response.data
                setErrorMsg(message)
            },
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Logo to={'/dashboard'}>5works</Logo>
            <Input
                variant="register"
                placeholder="아이디를 입력하세요."
                name="id"
                type="text"
                onChange={onChange}
                value={state.id}
            />
            <Input
                variant="register"
                placeholder="비밀번호를 입력하세요"
                type="password"
                name="password"
                onChange={onChange}
                value={state.password}
            />
            <ErrorSpan>{errorMsg}</ErrorSpan>
            <Button variant="register" type="submit">
                로그인
            </Button>
            <BoardFrame height="3rem" justifyContent="space-between">
                <SpanText>
                    아이디/비밀번호 분실시,
                    <br /> 해당 관리자에게 문의해주세요.
                </SpanText>

                <CheckBoxInput
                    width="10rem"
                    id="account-saving-checkbox"
                    labelText="계정 저장"
                    textLineHeight="3rem"
                />
            </BoardFrame>
        </Form>
    )
}

export default SignIn

const Form = styled.form`
    ${flexColumn}
    ${absoluteCenter}
    align-items: center;
    justify-content: space-between;
    height: 30rem;
`

const SpanText = styled.span`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.gray[0]};
`

const ErrorSpan = styled.span`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.red[0]};
`
