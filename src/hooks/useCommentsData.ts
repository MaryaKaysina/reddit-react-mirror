import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsRequestAsync } from "../store/comments/actions";
import { CommentsState } from "../store/comments/reducer";
import { RootState } from "../store/reducer";

interface IUseCommentsData {
  postId?: string;
  subreddit?: string;
}

export function useCommentsData({ postId, subreddit }: IUseCommentsData) {
  const comments = useSelector<RootState, CommentsState>(state => state.commentsPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(commentsRequestAsync({ postId, subreddit }));
  }, [])

  return comments;
}
