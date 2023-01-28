import React, { useCallback, useEffect, useState } from 'react'
import Applayout from '../componets/Applayout'
import Head from 'next/head'
import NickNameEdition from '../componets/NickNameEdition';
import FollowList from '../componets/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr'

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

export default function Profile() {
  const [followersLimit, setFollowersLimit] = useState(3)
  const [followingsLimit, setFollowingsLimit] = useState(3)
 
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if(!(user && user.id)) {
      Router.push('/')
    }
  }, [user && user.id])

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3)
  }, [])

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3)
  }, [])

  if (!user) {
    return '내 정보 로딩중...'
  }

  const { data: followersData, error: followerError } = useSWR(`http://localhost:3333/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3333/user/followings?limit=${followingsLimit}`, fetcher);

  if(followerError || followingError) {
    console.error(followerError || followingError)
    return <div>팔로잉/팔로워 로딩 중 에러가 발생했습니다.</div>
  }

  return (
    <>
      <Head>
        <title>내 프로필 | 노드버드</title>
      </Head>
      <Applayout>
        <NickNameEdition />
        <FollowList header='팔로잉' data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
        <FollowList header='팔로워' data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
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
