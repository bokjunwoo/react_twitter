import React, { useCallback, useState } from 'react'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import userInput from '../hooks/userInput'
import { useDispatch } from 'react-redux'
import { loginRequestAction } from '../reducers/user'
import { useSelector } from 'react-redux'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`
const FormWrapper = styled(Form)`
  padding: 10px;
`

export default function LoginForm(){
  const { logInLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  
  const [email, onChangeEmail] = userInput('')
  const [pw, onChangePw] = userInput('')

  const onSubmitForm = useCallback((e: React.MouseEvent<HTMLElement>) => {
    console.log(email, pw);
    dispatch(loginRequestAction({ email, pw }))
  }, [email, pw])
  
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user_id'>이메일</label>
        <br />
        <Input name='user_id' type='email' value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor='user_pw'>비밀번호</label>
        <br />
        <Input name='user_pw' value={pw} onChange={onChangePw} required />
      </div>
      <ButtonWrapper>
        <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
        <Link href='/signup' ><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}
