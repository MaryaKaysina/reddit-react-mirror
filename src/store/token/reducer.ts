import { Reducer } from "redux";
import {
  TokenRequestAction,
  TokenRequestErrorAction,
  TokenRequestSuccessAction,
  TOKEN_REQUEST,
  TOKEN_REQUEST_ERROR,
  TOKEN_REQUEST_SUCCESS
} from "./actions";

export type TokenState = {
  loading: boolean;
  error: string;
  token: string;
}

const initialState: TokenState = {
  loading: false,
  error: '',
  token: '',
}

type TokenActions = TokenRequestAction
| TokenRequestSuccessAction
| TokenRequestErrorAction;

export const tokenReducer: Reducer<TokenState, TokenActions> = (state = initialState, action) => {
  switch(action.type) {
    case TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case TOKEN_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
      }
    default:
      return state;
  }
}
