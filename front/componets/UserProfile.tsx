import { Avatar, Button, Card } from 'antd'
import React, { useCallback } from 'react'

export default function Userprofile({ setIsLogin }) {
  const onLogOut = useCallback(() => {
    setIsLogin(false)
  }, [])
  
  return (
    <Card
      actions={[
        <div key='twit'>짹짹<br />0</div>,
        <div key='follwings'>팔로잉<br />0</div>,
        <div key='follower'>팔로워<br />0</div>
      ]}
    >
      <Card.Meta 
        avatar={<Avatar>JW</Avatar>}
        title='JW'
      />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  )
}
