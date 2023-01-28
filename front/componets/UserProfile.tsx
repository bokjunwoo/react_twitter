import { Avatar, Button, Card } from 'antd'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'
import Link from 'next/link';

export default function Userprofile() {
  const dispatch = useDispatch();
  const { user, logOutLoading } = useSelector((state) => state.user)

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction())
  }, [])
  
  return (
    <Card
      actions={[
        <div key="twit"><Link href={`/user/${user.id}`}><a>짹짹<br />{user.Posts.length}</a></Link></div>,
        <div key="followings"><Link href="/profile"><a>팔로잉<br />{user.Followings.length}</a></Link></div>,
        <div key="followings"><Link href="/profile"><a>팔로워<br />{user.Followers.length}</a></Link></div>,
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
