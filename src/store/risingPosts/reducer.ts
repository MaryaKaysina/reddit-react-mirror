import { Reducer } from "redux";
import { IPost, RisingRequestAction, RisingRequestErrorAction, RisingRequestSuccessAction, RISING_REQUEST, RISING_REQUEST_ERROR, RISING_REQUEST_SUCCESS } from "./actions";

export type RisingState = {
  risingLoading: boolean;
  risingError: string;
  risingData: IPost;
}

const initialState: RisingState = {
  risingLoading: false,
  risingError: '',
  risingData: {
    after: '',
    data: [],
  },
}

type RisingActions = RisingRequestAction
  | RisingRequestSuccessAction
  | RisingRequestErrorAction;

export const risingReducer: Reducer<RisingState, RisingActions> = (state = initialState, action) =>
{
  switch(action.type) {
    case RISING_REQUEST:
      return {
        ...state,
        risingLoading: true,
      }
    case RISING_REQUEST_ERROR:
      return {
        ...state,
        risingError: action.error,
        risingLoading: false,
      }
    case RISING_REQUEST_SUCCESS:
      return {
        ...state,
        risingData: action.data,
        risingLoading: false,
      }
    default:
      return state;
  }
}
