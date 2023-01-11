import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Input, Menu, Row, Col } from 'antd'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'
import styled from 'styled-components'

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`

export default function Applayout({ children }) {
  const [isLogin, setIsLogin] = useState(false)

  const aa = () => {
    setIsLogin(true)
  }
  
  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton/>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLogin ? <UserProfile setIsLogin={setIsLogin}/> : <LoginForm setIsLogin={setIsLogin}/>}
        </Col>
        <Col xs={24} md={12}>
        {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="" target='_blank' rel='noreferrer noopener'>사이트</a>
        </Col>
      </Row>
    </div>
  )
}

Applayout.prototype = {
  children: PropTypes.node.isRequired,
}