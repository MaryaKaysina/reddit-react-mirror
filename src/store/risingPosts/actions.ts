import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// RISING_REQUEST
export const RISING_REQUEST = 'RISING_REQUEST';

export type RisingRequestAction = {
  type: typeof RISING_REQUEST;
}

export const risingRequest: ActionCreator<RisingRequestAction> = () => ({
  type: RISING_REQUEST,
});

// RISING_REQUEST_SUCCESS
export interface IPostItem {
  after?: string;
  author?: string;
  avatar?: string;
  preview?: string;
  url?: string;
  title?: string;
  created?: string;
  karma?: string;
  postId?: string;
  subreddit?: string;
  banner?: string;
}

export interface IPost {
  after: string;
  data: IPostItem[];
}

export const RISING_REQUEST_SUCCESS = 'RISING_REQUEST_SUCCESS';

export type RisingRequestSuccessAction = {
  type: typeof RISING_REQUEST_SUCCESS;
  data: IPost;
}

export const risingRequestSuccess: ActionCreator<RisingRequestSuccessAction> = (data: IPost) => ({
  type: RISING_REQUEST_SUCCESS,
  data,
});

// RISING_REQUEST_ERROR
export const RISING_REQUEST_ERROR = 'RISING_REQUEST_ERROR';

export type RisingRequestErrorAction = {
  type: typeof RISING_REQUEST_ERROR;
  error: string;
}

export const risingRequestError: ActionCreator<RisingRequestErrorAction> = (error: string) => ({
  type: RISING_REQUEST_ERROR,
  error,
});

export const risingRequestAsync =
  (bestAfter: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(risingRequest());

    const prevData: IPostItem[] = getState().risingPosts.risingData.data;

    axios.get('https://oauth.reddit.com/rising?sr_detail=true', {
      headers: { Authorization: `bearer ${getState().token.token}` },
      params: {
        limit: 10,
        after: bestAfter,
      }
    })
    .then((res) => {
      const postData = res.data.data;
      let postDataList = {};

      const after = postData.after;
      let dataset: IPostItem[] = [];

      postData.children.map((item: any) => {
        dataset.push({
          author: item.data.author,
          avatar: item.data.sr_detail.icon_img,
          preview: item.data.thumbnail,
          url: item.data.url,
          title: item.data.sr_detail.title,
          created: item.data.sr_detail.created,
          karma: item.data.ups,
          postId: item.data.id,
          subreddit: item.data.subreddit,
          banner: item.data.sr_detail.banner_img,
        })
      })

      postDataList = {
        after: after,
        data: prevData.concat(...dataset),
      }

      dispatch(risingRequestSuccess(postDataList));
    })
    .catch((error) => {
      dispatch(risingRequestError(String(error)));
    });
  }
