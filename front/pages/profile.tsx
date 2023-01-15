import React, { useEffect } from 'react'
import Applayout from '../componets/Applayout'
import Head from 'next/head'
import NickNameEdition from '../componets/NickNameEdition';
import FollowList from '../componets/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router'

export default function Profile() {
  const { user } = useSelector((state) => state.user)

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
