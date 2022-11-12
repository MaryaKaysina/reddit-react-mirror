import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bestRequestAsync } from "../store/bestPosts/actions";
import { BestState } from "../store/bestPosts/reducer";
import { RootState } from "../store/reducer";

export function useBestPostsData() {
  const bestPosts = useSelector<RootState, BestState>(state => state.bestPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(bestRequestAsync(bestPosts.bestData.after));
  }, [])

  return bestPosts;
}

