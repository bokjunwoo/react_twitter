import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/userInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const { user } = useSelector((state) => state.user);
  const [nickName, onChangeNickname] = useInput(user?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickName,
    });
  }, [nickName]);

  return (
    <Form
      style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}
    >
      <Input.Search
        value={nickName}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;