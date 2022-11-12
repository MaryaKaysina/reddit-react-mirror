import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// COMMENTS_REQUEST
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';

export type CommentsRequestAction = {
  type: typeof COMMENTS_REQUEST;
}

export const commentsRequest: ActionCreator<CommentsRequestAction> = () => ({
  type: COMMENTS_REQUEST,
});

// COMMENTS_REQUEST_SUCCESS
export interface ICommentsData {
  data: any[];
}

export interface IComments {
  postId?: string;
  subreddit?: string;
}

export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';

export type CommentsRequestSuccessAction = {
  type: typeof COMMENTS_REQUEST_SUCCESS;
  data: ICommentsData;
}

export const commentsRequestSuccess: ActionCreator<CommentsRequestSuccessAction> = (data: ICommentsData) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  data,
});

// COMMENTS_REQUEST_ERROR
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';

export type CommentsRequestErrorAction = {
  type: typeof COMMENTS_REQUEST_ERROR;
  error: string;
}

export const commentsRequestError: ActionCreator<CommentsRequestErrorAction> = (error: string) => ({
  type: COMMENTS_REQUEST_ERROR,
  error,
});

export const commentsRequestAsync =
  ({ postId, subreddit }: IComments): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(commentsRequest());

    axios.get(`https://oauth.reddit.com/r/${subreddit}/comments/${postId}.json`, {
      headers: { Authorization: `bearer ${getState().token.token}` },
    })
    .then((res) => {
      const commentsData = res.data[1].data.children;
      dispatch(commentsRequestSuccess({ data: commentsData }));
    })
    .catch((error) => {
      dispatch(commentsRequestError(String(error)));
    });
  }
