import axios from 'axios';
import Head from 'next/dist/next-server/lib/head';
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Applayout from '../../componets/Applayout';
import PostCard from '../../componets/PostCard';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import 'antd/dist/antd.css';

export default function Post() {
  const router = useRouter();
  const { id } = router.query

  const { singlePost } = useSelector((state) => state.post)
  return (
    <Applayout>
      <Head>
        <title>
          {singlePost.User.nickName}
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickName}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost:3000/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </Applayout>
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
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});