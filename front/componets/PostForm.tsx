import { Button, Form, Input } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userInput from '../hooks/userInput';
import { addPost, ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';

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
    if(!text || !text.trim()) {
      return alert('게시글을 작성하세요')
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    })
  }, [text, imagePaths])

  const onChangeimages = useCallback((e) => {
    console.log('images', e.target.files)
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    })
  }, [])

  const onRemoveImage = useCallback((i) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: i
    })
  }, [])
  
  return (
    <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea 
        value={text}
        onChange={onChangetext}
        maxLength={140}
        placeholder='적아봐요' 
      />
        
        <div>
          <input type="file" name='image' multiple hidden style={{ display: 'none'}} ref={imageInput} onChange={onChangeimages}/>
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit'>짹짹</Button>
        </div>
        
        <div>
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3333/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
            )
          )}
        </div>
    </Form>
  )
}
