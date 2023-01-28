import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

export default function FollowButton({ post }) {
  const dispatch = useDispatch();

  const { user, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const isFollowing = user?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      })
    }
  }, [isFollowing]);

  if(post.User.id === user.id) {
    return null
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}

FollowButton.prototype = {
  post: PropTypes.object.isRequired,
};
