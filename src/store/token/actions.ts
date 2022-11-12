import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// ME_REQUEST
export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export type TokenRequestAction = {
  type: typeof TOKEN_REQUEST;
}

export const TokenRequest: ActionCreator<TokenRequestAction> = () => ({
  type: TOKEN_REQUEST,
});

// ME_REQUEST_SUCCESS
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';

export type TokenRequestSuccessAction = {
  type: typeof TOKEN_REQUEST_SUCCESS;
  token: string;
}

export const TokenRequestSuccess: ActionCreator<TokenRequestSuccessAction> = (token: string) => ({
  type: TOKEN_REQUEST_SUCCESS,
  token,
});

// ME_REQUEST_ERROR
export const TOKEN_REQUEST_ERROR = 'TOKEN_REQUEST_ERROR';

export type TokenRequestErrorAction = {
  type: typeof TOKEN_REQUEST_ERROR;
  error: string;
}

export const TokenRequestError: ActionCreator<TokenRequestErrorAction> = (error: string) => ({
  type: TOKEN_REQUEST_ERROR,
  error,
});

export const saveToken =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(TokenRequest());

    const setToken = localStorage.getItem('tokenReddit') || window.__token__;
    if (setToken) {
      if (window.__token__
        && window.__token__.length > 0
        && window.__token__ != 'undefined')
      {
        localStorage.setItem('tokenReddit', window.__token__);
      }
      dispatch(TokenRequestSuccess(setToken));
    } else {
      dispatch(TokenRequestError('Token not found(:'));
    }
  }
