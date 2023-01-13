import { all, fork } from 'redux-saga/effects'
// call(동기호출) fork(비동기호출)
import userSaga from './user'
import postSaga from './post'

export default function* rootSaga() {
  yield all([ // all 동시에 실행
    fork(userSaga),
    fork(postSaga),
  ]);
}