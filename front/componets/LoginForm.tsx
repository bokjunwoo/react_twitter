import React, { useCallback, useState } from 'react'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import userInput from '../hooks/userInput'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`
const FormWrapper = styled(Form)`
  padding: 10px;
`

export default function LoginForm(){
  const dispatch = useDispatch();
  const [id, onChangeId] = userInput('')
  const [pw, onChangePw] = userInput('')

  const onSubmitForm = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(id, pw);
    dispatch(loginAction({ id, pw }))
  }, [id, pw])
  
  return (
    <FormWrapper>
      <div>
        <label htmlFor='user_id'>아이디</label>
        <br />
        <Input name='user_id' value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor='user_pw'>비밀번호</label>
        <br />
        <Input name='user_pw' value={pw} onChange={onChangePw} required />
      </div>
      <ButtonWrapper>
        <Button type='primary' htmlType='submit' onClick={onSubmitForm}>로그인</Button>
        <Link href='/signup' ><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}
