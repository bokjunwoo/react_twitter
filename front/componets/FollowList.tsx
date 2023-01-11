import { StopOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { DataTypes } from '../types'

export default function FollowList({ header, data }:DataTypes) {
  return (
    <List 
      header={<div>{header}</div>}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      style={{ marginBottom: 20}}
      loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><button>더 보기</button></div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key='stop' />]}>
            <Card.Meta description={item.nickName} />
          </Card>
        </List.Item>
      )}
    />
  )
}

FollowList.prototype = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}
