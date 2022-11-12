import { Reducer } from "redux";
import { BestRequestAction, BestRequestErrorAction, BestRequestSuccessAction, BEST_REQUEST, BEST_REQUEST_ERROR, BEST_REQUEST_SUCCESS, IPost } from "./actions";

export type BestState = {
  bestLoading: boolean;
  bestError: string;
  bestData: IPost;
}

const initialState: BestState = {
  bestLoading: false,
  bestError: '',
  bestData: {
    after: '',
    data: [],
  },
}

type BestActions = BestRequestAction
  | BestRequestSuccessAction
  | BestRequestErrorAction;

export const bestReducer: Reducer<BestState, BestActions> = (state = initialState, action) =>
{
  switch(action.type) {
    case BEST_REQUEST:
      return {
        ...state,
        bestLoading: true,
      }
    case BEST_REQUEST_ERROR:
      return {
        ...state,
        bestError: action.error,
        bestLoading: false,
      }
    case BEST_REQUEST_SUCCESS:
      return {
        ...state,
        bestData: action.data,
        bestLoading: false,
      }
    default:
      return state;
  }
}
