import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import userInput from '../hooks/userInput';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

export default function CommentForm({ post }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user?.id);
  const { addCommentDone, addCommentLoding } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = userInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: user },
    });
  }, [commentText, user]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button type='primary' htmlType='submit' style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1}} loading={addCommentLoding}>
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.prototype = {
  post: PropTypes.object.isRequired,
};
