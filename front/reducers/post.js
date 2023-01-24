import shortId from 'shortid'
import produce from 'immer'
import { faker } from '@faker-js/faker'

export const initialState = {
  mainPosts: [
    // {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickName: '준우',
    //   },
    //   content: '첫 게시글 #해시태그 #익스프레스',
    //   Images: [
    //     {
    //       id: shortId.generate(),
    //       src: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'
    //     }, {
    //       id: shortId.generate(),
    //       src: 'https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg'
    //     }, {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074__480.jpg'
    //     }
    //   ],
    //   Comments: [{
    //     id: shortId.generate(),
    //     User: {
    //       id: shortId.generate(),
    //       nickName: '예은',
    //     },
    //     content: '사고싶어요',
    //   }],
    // }
  ],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

export const generateDummyPost = (number) => Array(number).fill().map((v, i) => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickName: faker.name.findName()
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image()
  }],
  Comments: [{
    User: {
      id: shortId.generate(),
      nickName: faker.name.findName()
    },
    content: faker.lorem.sentence()
  }]
}));


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data)
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error
        break
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
        // const post = { ...state.mainPosts[postIndex] }
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // }
        break
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break
      default:
        return state
    }
  })
}

export default reducer