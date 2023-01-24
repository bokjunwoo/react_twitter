import { all, fork, call, put, takeLatest, delay, throttle } from 'redux-saga/effects'
import axios from 'axios';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, generateDummyPost, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// 로딩
function loadPostsAPI(data) {
  return axios.post('/api/post', data)
}

function* loadPosts(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data
    })
  }
}

// 포스트
function addPostAPI(data) {
  return axios.post('/post', { content: data })
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    })
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    })
  }
}

// 포스트 삭제
function addRemoveAPI(data) {
  return axios.post('/api/post', data)
}

function* removePost(action) {
  try {
    yield delay(1000)
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    })
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    })
  }
}

// 코멘트
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    })
  }
}

// throttle (지정한 ?초안에 한번만 실핼)
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddCommentPost() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddCommentPost),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ])
}