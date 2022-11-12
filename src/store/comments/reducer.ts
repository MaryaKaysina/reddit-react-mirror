import { Reducer } from "redux";
import { CommentsRequestAction, CommentsRequestErrorAction, CommentsRequestSuccessAction, COMMENTS_REQUEST, COMMENTS_REQUEST_ERROR, COMMENTS_REQUEST_SUCCESS, ICommentsData } from "./actions";

export type CommentsState = {
  commentsLoading: boolean;
  commentsError: string;
  commentsData: ICommentsData;
}

const initialState: CommentsState = {
  commentsLoading: false,
  commentsError: '',
  commentsData: {
    data: []
  },
}

type CommentsActions = CommentsRequestAction
  | CommentsRequestSuccessAction
  | CommentsRequestErrorAction;

export const commentsReducer: Reducer<CommentsState, CommentsActions> = (state = initialState, action) =>
{
  switch(action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        commentsLoading: true,
      }
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        commentsError: action.error,
        commentsLoading: false,
      }
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        commentsData: action.data,
        commentsLoading: false,
      }
    default:
      return state;
  }
}
