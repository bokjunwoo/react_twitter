import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Applayout from "../componets/Applayout";
import PostForm from "../componets/PostForm";
import PostCard from "../componets/PostCard";
import "antd/dist/antd.css";
import { useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Index = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])

  useEffect(() => {
    function onScroll() {
      if(window.screenY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if(hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePosts, loadPostsLoading])
  
  return (
    <Applayout>
      {user && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Applayout>
  );
};

export default Index;
