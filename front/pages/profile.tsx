import React from 'react'
import Applayout from '../componets/Applayout'
import Head from 'next/head'
import NickNameEdition from '../componets/NickNameEdition';
import FollowList from '../componets/FollowList';

export default function Profile() {
  const followerList:{nickName: string}[] = [{ nickName: '예은'}, {nickName: '지원'},  {nickName: '준우'}];
  const followingList:{nickName: string}[] = [{ nickName: '예은'}, {nickName: '지원'},  {nickName: '준우'}];
  return (
    <>
      <Head>
        <title>내 프로필 | 노드버드</title>
      </Head>
      <Applayout>
        <NickNameEdition />
        <FollowList header='팔로잉 목록' data={followingList}/>
        <FollowList header='팔로워 목록' data={followerList}/>
      </Applayout>
    </>
  )
}
