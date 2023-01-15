import React, { useCallback, useState } from 'react';
import Applayout from '../componets/Applayout';
import Head from 'next/head';
import { Checkbox, Form, Input, Button } from 'antd';
import userInput from '../hooks/userInput';
import styled from 'styled-components';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ErrorMessage = styled.div`
  color: red;
`;

export default function Signup() {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = userInput('');
  const [nickName, onChangeNickName] = userInput('');

  const [pw, onChangePw] = userInput('');
  const [pwCheck, setPwCheck] = useState('');
  const [pwError, setPwError] = useState(false);
  const onChangePwCheck = useCallback(
    (e) => {
      setPwCheck(e.target.value);
      setPwError(e.target.value !== pw);
    },
    [pw]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTermCheck = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [pw]
  );

  const onSubmitForm = useCallback(() => {
    if (pw !== pwCheck) {
      return setPwError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickName, term);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, pw, nickName },
    });
  }, [pw, pwCheck, term]);

  return (
    <Applayout>
      <Head>
        <title>회원가입 | 노드버드</title>
      </Head>
      <Form onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user_email'>이메일</label>
          <br />
          <Input
            name='user_email'
            type='email'
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>

        <div>
          <label htmlFor='user_nickName'>닉네임</label>
          <br />
          <Input
            name='user_nickName'
            value={nickName}
            onChange={onChangeNickName}
            required
          />
        </div>

        <div>
          <label htmlFor='user_pw'>비밀번호</label>
          <br />
          <Input name='user_pw' value={pw} onChange={onChangePw} required />
        </div>

        <div>
          <label htmlFor='user_pw_check'>비밀번호 체크</label>
          <br />
          <Input
            name='user_pw_check'
            type='text'
            value={pwCheck}
            required
            onChange={onChangePwCheck}
          />
          {pwError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>

        <div>
          <Checkbox
            name='user_term'
            checked={term}
            onChange={onChangeTermCheck}
          >
            동의
          </Checkbox>
          {termError && <ErrorMessage>약관 동의가 필요합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </Applayout>
  );
}
