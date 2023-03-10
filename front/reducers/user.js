import produce from 'immer'

export const initialState = {
  loadMyInfoloading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserloading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  user: null,
  signUpData: {},
  loginData: {},
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  loadFollwersLoading: false,
  loadFollwersDone: false,
  loadFollwersError: null,
  loadFollwingsLoading: false,
  loadFollwingsDone: false,
  loadFollwingsError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  changeNicknameLoading: false, // 팔로우 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  userInfo: null,
}

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST'
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS'
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE'

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST'
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS'
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoloading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoloading = false;
        draft.loadMyInfoDone = true;
        draft.user = action.data
        break
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoloading = false;
        draft.loadMyInfoError = action.error;
        break
      case LOAD_USER_REQUEST:
        draft.loadUserloading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break
      case LOAD_USER_SUCCESS:
        draft.loadUserloading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data
        break
      case LOAD_USER_FAILURE:
        draft.loadUserloading = false;
        draft.loadUserError = action.error;
        break
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.user = action.data
        break
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break
      case LOG_OUT_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.user = null;
        break
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break
      case ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data })
        break
      // return {
      //   ...state,
      //   user: {
      //     ...state.user,
      //     Posts: [{ id: action.data }, ...state.user.Posts],
      //   }
      // }
      case REMOVE_POST_OF_ME:
        draft.user.Posts = draft.user.Posts.filter((v) => v.id !== action.data);
        break
      // return {
      //   ...state,
      //   uesr: {
      //     ...state.user,
      //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
      //   }
      // }
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.user.Followings.push({ id: action.data.UserId })
        break
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.user.Followings = draft.user.Followings.filter((v) => v.id !== action.data.UserId);
        break
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollwersLoading = true;
        draft.loadFollwersDone = false;
        draft.loadFollwersError = null;
        break
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollwersLoading = false;
        draft.loadFollwersDone = true;
        draft.user.Followers = action.data
        break
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollwersLoading = false;
        draft.loadFollwersError = action.error;
        break
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollwingsLoading = true;
        draft.loadFollwingsDone = false;
        draft.loadFollwingsError = null;
        break
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollwingsLoading = false;
        draft.loadFollwingsDone = true;
        draft.user.Followings = action.data
        break
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollwingsLoading = false;
        draft.loadFollwingsError = action.error;
        break
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = null;
        break
      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        draft.user.Followers = draft.user.Followers.filter((v) => v.id !== action.data.UserId)
        break
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
        break
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.user.nickName = action.data.nickName;
        break
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break
      default:
        return state;
    }
  })
}

export default reducer;