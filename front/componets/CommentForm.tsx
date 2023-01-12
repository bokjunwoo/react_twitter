import { Button, Form, Input } from 'antd'
import React, { useCallback } from 'react'
import userInput from '../hooks/userInput'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export default function CommentForm({ post }) {
  const user = useSelector((state) => state.user.user?.id)

  const [commentText, onChangeCommentText] = userInput('')

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText)
  }, [commentText])

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type='primary' htmlType='submit'>삐약</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.prototype = {
  post: PropTypes.object.isRequired
}