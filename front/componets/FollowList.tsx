import { StopOutlined } from '@ant-design/icons';
import { Card, List, Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

export default function FollowList({ header, data, onClickMore, loading }) {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };
  return (
    <List
      header={<div>{header}</div>}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      style={{ marginBottom: 20 }}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={onClickMore} loading={loading}>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key='stop' onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickName} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.prototype = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
