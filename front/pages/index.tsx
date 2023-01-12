import React from 'react'
import { useSelector } from 'react-redux'
import Applayout from '../componets/Applayout'
import PostForm from '../componets/PostForm'
import PostCard from '../componets/PostCard'
import 'antd/dist/antd.css';

const Index = () => {
  const isLoign = useSelector((state) => state.user.isLogin);
  const mainPosts = useSelector((state) => state.post.mainPosts)
  return (
    <Applayout>
      {isLoign && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </Applayout>
  )
}

export default Index