import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { saveToken } from "../store/token/actions";

export function useToken() {
  const token = useSelector<RootState, string>(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.__token__) {
      dispatch<any>(saveToken());
    }
  }, []);

  return [token];
}
