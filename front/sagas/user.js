import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, FOLLOW_REQUEST, UNFOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE } from '../reducers/user';

// 로그인
function logInAPI(data) {
  return axios.post('/api/login', data)
}

function* logIn(action) {
  try {
    yield delay(1000)
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    })
  }
}

// 로그아웃
function logOutAPI() {
  return axios.post('/api/logout')
}

function* logOut() {
  try {
    yield delay(1000)
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    })
  }
}

// 회원가입
function signUpAPI() {
  return axios.post('/api/signup')
}

function* signUp() {
  try {
    yield delay(1000)
    // const result = yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    })
  }
}

// 팔로우
function followAPI() {
  return axios.post('/api/signup')
}

function* follow(action) {
  try {
    yield delay(1000)
    // const result = yield call(signUpAPI);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data
    })
  }
}

// 언팔로우
function unfollowAPI() {
  return axios.post('/api/signup')
}

function* unfollow(action) {
  try {
    yield delay(1000)
    // const result = yield call(signUpAPI);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data
    })
  }
}

// takeEvery (while문 대체) takeLatest(마지막 요청만)
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ])
}