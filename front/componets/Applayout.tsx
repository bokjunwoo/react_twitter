import PropTypes from 'prop-types'
import Link from 'next/link'
import { Input, Menu, Row, Col } from 'antd'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'
import styled, { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import userInput from '../hooks/userInput'
import Router from 'next/router'

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`

export default function Applayout({ children }) {
  const [searchInput, onChangeSearchInput] = userInput('')
  const { user } = useSelector((state) => state.user)

  const onSearch = useCallback(() => {
    Router.push(`hashtag/${searchInput}`)
  }, [searchInput])
  
  return (
    <div>
      <Global />
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch}/>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {user ? <UserProfile /> : <LoginForm />}
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