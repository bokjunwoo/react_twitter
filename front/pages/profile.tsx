import React, { useEffect } from 'react'
import Applayout from '../componets/Applayout'
import Head from 'next/head'
import NickNameEdition from '../componets/NickNameEdition';
import FollowList from '../componets/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

export default function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST
    })
  }, [])

  useEffect(() => {
    if(!(user && user.id)) {
      Router.push('/')
    }
  }, [user && user.id])

  if (!user) {
    return null
  }

  return (
    <>
      <Head>
        <title>내 프로필 | 노드버드</title>
      </Head>
      <Applayout>
        <NickNameEdition />
        <FollowList header='팔로잉' data={user.Followings}/>
        <FollowList header='팔로워' data={user.Followers}/>
      </Applayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});
