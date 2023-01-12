export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickName: '준우',
      },
      content: '첫 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'
        }, {
          src: 'https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg'
        }, {
          src: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074__480.jpg'
        }
      ],
      Comments: [{
        User: {
          nickName: '예은',
        },
        content: '사고싶어요',
      }],
    }
  ],
  imagePaths: [],
  postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
}

const dummyPost = {
  id: 2,
  content: '더미테이터',
  User: {
    id: 1,
    nickName: '준우'
  },
  Images: [],
  Comments: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      }
    default:
      return state
  }
}

export default reducer