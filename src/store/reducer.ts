import { ActionCreator, Reducer } from "redux";
import { BestRequestAction, BestRequestErrorAction, BestRequestSuccessAction, BEST_REQUEST, BEST_REQUEST_ERROR, BEST_REQUEST_SUCCESS } from "./bestPosts/actions";
import { bestReducer, BestState } from "./bestPosts/reducer";
import { CommentsRequestAction, CommentsRequestSuccessAction, CommentsRequestErrorAction, COMMENTS_REQUEST, COMMENTS_REQUEST_ERROR, COMMENTS_REQUEST_SUCCESS } from "./comments/actions";
import { commentsReducer, CommentsState } from "./comments/reducer";
import {
  MeRequestAction,
  MeRequestErrorAction,
  MeRequestSuccessAction,
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS
} from "./me/actions";
import { meReducer, MeState } from "./me/reducer";
import { RisingRequestAction, RisingRequestErrorAction, RisingRequestSuccessAction, RISING_REQUEST, RISING_REQUEST_ERROR, RISING_REQUEST_SUCCESS } from "./risingPosts/actions";
import { risingReducer, RisingState } from "./risingPosts/reducer";
import { TokenRequestAction, TokenRequestErrorAction, TokenRequestSuccessAction, TOKEN_REQUEST, TOKEN_REQUEST_ERROR, TOKEN_REQUEST_SUCCESS } from "./token/actions";
import { tokenReducer, TokenState } from "./token/reducer";

export type RootState = {
  commentText: string;
  answerText: string;
  commentsPost: CommentsState,
  bestPosts: BestState,
  risingPosts: RisingState,
  me: MeState;
  token: TokenState;
}

const initialState: RootState = {
  commentText: '',
  answerText: '',
  bestPosts: {
    bestLoading: false,
    bestError: '',
    bestData: {
      after: '',
      data: [],
    },
  },
  risingPosts: {
    risingLoading: false,
    risingError: '',
    risingData: {
      after: '',
      data: [],
    },
  },
  commentsPost: {
    commentsLoading: false,
    commentsError: '',
    commentsData: {
      data: []
    },
  },
  me: {
    loading: false,
    error: '',
    data: {}
  },
  token: {
    loading: false,
    error: '',
    token: '',
  }
}

// UPDATE_COMMENT
const UPDATE_COMMENT = 'UPDATE_COMMENT';

type UpdateCommentAction = {
  text: string;
  type: typeof UPDATE_COMMENT;
}

export const updateComment: ActionCreator<UpdateCommentAction> = (text: string) => ({
  type: UPDATE_COMMENT,
  text
});

// UPDATE_ANSWER
const UPDATE_ANSWER = 'UPDATE_ANSWER';

type UpdateAnswerAction = {
  text: string;
  type: typeof UPDATE_ANSWER;
}

export const updateAnswer: ActionCreator<UpdateAnswerAction> = (text: string) => ({
  type: UPDATE_ANSWER,
  text
});

// SET_TOKEN
const SET_TOKEN = 'SET_TOKEN';

type SetTokenAction = {
  token: string;
  type: typeof SET_TOKEN;
}

export const setToken: ActionCreator<SetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token
});

// MyAction
type MyAction = UpdateCommentAction
  | SetTokenAction
  | UpdateAnswerAction
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestErrorAction
  | TokenRequestAction
  | TokenRequestSuccessAction
  | TokenRequestErrorAction
  | BestRequestAction
  | BestRequestSuccessAction
  | BestRequestErrorAction
  | RisingRequestAction
  | RisingRequestSuccessAction
  | RisingRequestErrorAction
  | CommentsRequestAction
  | CommentsRequestSuccessAction
  | CommentsRequestErrorAction;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    case UPDATE_ANSWER:
      return {
        ...state,
        answerText: action.text,
      };
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      }
    case TOKEN_REQUEST:
    case TOKEN_REQUEST_SUCCESS:
    case TOKEN_REQUEST_ERROR:
      return {
        ...state,
        token: tokenReducer(state.token, action),
      }
    case BEST_REQUEST:
    case BEST_REQUEST_SUCCESS:
    case BEST_REQUEST_ERROR:
      return {
        ...state,
        bestPosts: bestReducer(state.bestPosts, action),
      }
    case RISING_REQUEST:
    case RISING_REQUEST_SUCCESS:
    case RISING_REQUEST_ERROR:
      return {
        ...state,
        risingPosts: risingReducer(state.risingPosts, action),
      }
    case COMMENTS_REQUEST:
    case COMMENTS_REQUEST_ERROR:
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        commentsPost: commentsReducer(state.commentsPost, action),
      }
    default:
      return state;
  }
}


