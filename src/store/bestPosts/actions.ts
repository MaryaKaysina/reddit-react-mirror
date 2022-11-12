import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// BEST_REQUEST
export const BEST_REQUEST = 'BEST_REQUEST';

export type BestRequestAction = {
  type: typeof BEST_REQUEST;
}

export const bestRequest: ActionCreator<BestRequestAction> = () => ({
  type: BEST_REQUEST,
});

// BEST_REQUEST_SUCCESS
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

export const BEST_REQUEST_SUCCESS = 'BEST_REQUEST_SUCCESS';

export type BestRequestSuccessAction = {
  type: typeof BEST_REQUEST_SUCCESS;
  data: IPost;
}

export const bestRequestSuccess: ActionCreator<BestRequestSuccessAction> = (data: IPost) => ({
  type: BEST_REQUEST_SUCCESS,
  data,
});

// BEST_REQUEST_ERROR
export const BEST_REQUEST_ERROR = 'BEST_REQUEST_ERROR';

export type BestRequestErrorAction = {
  type: typeof BEST_REQUEST_ERROR;
  error: string;
}

export const bestRequestError: ActionCreator<BestRequestErrorAction> = (error: string) => ({
  type: BEST_REQUEST_ERROR,
  error,
});

export const bestRequestAsync =
  (bestAfter: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(bestRequest());

    const prevData: IPostItem[] = getState().bestPosts.bestData.data;

    axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
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

      dispatch(bestRequestSuccess(postDataList));
    })
    .catch((error) => {
      dispatch(bestRequestError(String(error)));
    });
  }
