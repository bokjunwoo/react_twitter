import { Avatar, Button, Card } from 'antd'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

export default function Userprofile() {
  const dispatch = useDispatch();
  const { user, logOutLoading } = useSelector((state) => state.user)

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction())
  }, [])
  
  return (
    <Card
      actions={[
        <div key='twit'>짹짹<br />{user.Posts.length}</div>,
        <div key='followings'>팔로잉<br />{user.Followings.length}</div>,
        <div key='followers'>팔로워<br />{user.Followers.length}</div>
      ]}
    >
      <Card.Meta 
        avatar={<Avatar>{user.nickName[0]}</Avatar>}
        title={user.nickName}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  )
}
