import React from 'react';
import Applayout from '../componets/Applayout'
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import { Avatar, Card } from 'antd';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <Applayout>
      <Head>
        <title>NodeBird</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickName[0]}</Avatar>}
              title={userInfo.nickName}
              description="노드버드 매니아"
            />
          </Card>
        )
        : null}
    </Applayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  console.log('getStaticProps');
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;