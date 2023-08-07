import React, { ChangeEvent, useState } from 'react'
import { BoardFrame } from '@components/common/Board/Board'
import Button from '@components/common/Button/Button'
import { CheckBoxInput, LabelInput } from '@components/common/Input/Input'
import Label from '@components/common/Label/Label'
import { useForm } from '@hooks/common/Form/useForm'
import { usersMutations } from '@hooks/queries/users'
import {
    emptyStringValidator,
    passwordConfirmValidator,
} from '@utils/validators'
import { objectValuesToArray } from '@utils/objectValuesToArray'

interface UserDetailManagementProps {
    userDetail: UserDetailType
}

function UserDetailManagement({ userDetail }: UserDetailManagementProps) {
    const { id, email, username, status, userId } = userDetail
    // const { data: user } = usersQueries.useGetUserById({ userId: userId })
    const { mutate: deleteUserMutate } = usersMutations.useDeleteUser()
    const { mutate: updateUserMutate } = usersMutations.useUpdateUser()

    const [state, onChange, setState] = useForm({
        id: id,
        password: '',
        passwordConfirm: '',
        username: username,
        email: email,
        status: status,
    })
    const [errorMsg, setErrorMsg] = useState('')

    const formValidator = () => {
        const { password, passwordConfirm } = state
        const isPasswordConfirm = passwordConfirmValidator(
            password,
            passwordConfirm
        )

        const stringArr = objectValuesToArray(state)
        const hasEmptyString = emptyStringValidator([...stringArr])

        return ![isPasswordConfirm, hasEmptyString].includes(false)
    }

    const handleChangeCheckBoxInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target

        const status = checked ? 'Y' : 'N'
        setState({ ...state, [name]: status })
    }

    const handleClickEdit = () => {
        const requestParams = { ...state, userId: userId }
        if (formValidator()) {
            updateUserMutate(requestParams)
        } else {
            setErrorMsg('작성란을 다시 확인해 주세요')
        }
    }

    const handleClickDelete = () => {
        deleteUserMutate(userDetail.userId)
    }

    return (
        <>
            <LabelInput
                labelText="아이디"
                name="id"
                required={true}
                important={true}
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
            <LabelInput
                labelText="패스워드 확인"
                important={true}
                name="passwordConfirm"
                type="password"
                required={true}
                onChange={onChange}
                value={state.passwordConfirm}
            />

            <BoardFrame margin="1rem 0">
                <Label width="15rem" textLineHeight="2.4rem" height="2rem">
                    상태<span className="importantSpan">*</span>
                </Label>
                <CheckBoxInput
                    labelText={state.status === 'N' ? '사용' : '사용안함'}
                    width="10rem"
                    textLineHeight="2.4rem"
                    name="status"
                    checked={state.status === 'N' ? true : false}
                    onChange={handleChangeCheckBoxInput}
                />
                {/* <CheckBoxInput
                        labelText="사용 안함"
                        width="10rem"
                        textLineHeight="2.4rem"
                        onChange={handleChangeCheckBoxInput}
                        name="unUse"
                        checked={!state.status}
                    /> */}
            </BoardFrame>
            <BoardFrame variant="warning" margin="0.5rem 0">
                {errorMsg}
            </BoardFrame>
            <BoardFrame margin="1rem 0" justifyContent="center">
                <Button variant="normal" onClick={handleClickEdit}>
                    수정
                </Button>
                <Button variant="normal" onClick={handleClickDelete}>
                    삭제
                </Button>
            </BoardFrame>
        </>
    )
}

export default UserDetailManagement
