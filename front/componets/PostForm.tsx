import { Button, Form, Input } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userInput from '../hooks/userInput';
import { addPost } from '../reducers/post';

export default function PostForm() {
  const dispatch = useDispatch();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  
  const [text, onChangetext, setText] = userInput('');

  useEffect(() => {
    if(addPostDone) {
      setText('')
    }
  }, [addPostDone])


  const onSubmit = useCallback(() => {
    dispatch(addPost(text))
  }, [text])
  
  return (
    <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea 
        value={text}
        onChange={onChangetext}
        maxLength={140}
        placeholder='적아봐요' 
      />
        
        <div>
          <input type="file" multiple hidden style={{ display: 'none'}} ref={imageInput}/>
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit'>짹짹</Button>
        </div>
        
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
            )
          )}
        </div>
    </Form>
  )
}
