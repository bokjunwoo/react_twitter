import { Button, Form, Input } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

export default function PostForm() {
  const dispatch = useDispatch();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const imagePaths = useSelector((state) => state.post.imagePaths);
  
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value)
  }, [])

  const onSubmit = useCallback(() => {
    dispatch(addPost)
    setText('')
  }, [])
  
  return (
    <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea 
        value={text}
        onChange={onChangeText}
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
