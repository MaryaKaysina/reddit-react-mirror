import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Preview } from './Preview';
import { TextContent } from './TextContent';
import { EIcons, Icon } from '../Icon';
import styles from './post.css';
import { CommentList } from './CommentList';
import { CommentFormContainer } from '../CommentFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { generateId } from '../../utils/react/generateRandomIndex';
import { useNavigate, useParams } from 'react-router-dom';
import { useBestPostsData } from '../../hooks/useBestPostsData';
import { commentsRequestAsync } from '../../store/comments/actions';
import { NotFoundPage } from '../NotFoundPage';

interface IPostItem {
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

interface IPostsData {
  post?: IPostItem;
  onClose?: () => void;
}

export function Post(props: IPostsData) {
  const [post, setPost] = useState<IPostItem>({});
  const token = useSelector<RootState, string>(state => state.token.token);
  const name = useSelector<RootState, string | undefined>(state => state.me.data.name);
  const comments = useSelector<RootState, any[]>(state => state.commentsPost.commentsData.data).map(generateId);
  const bestPosts = useBestPostsData().bestData.data;
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  let id = useParams().id;

  useEffect(() => {
    if (bestPosts.length === 0 && !props.post) return;
    const currentPost = props.post ? props.post : bestPosts.filter((item: IPostItem) => item.postId == id)[0];
    setPost(currentPost);
  }, [bestPosts, props.post, token]);

  useEffect(() => {
    if (!post) return;
    if (Object.keys(post).length === 0) return;
    dispatch<any>(commentsRequestAsync({ postId: post.postId, subreddit: post.subreddit }));
  }, [post]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        navigate("/");
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    (
      <>
        {post && (<div className={styles.modal} ref={ref}>
          <div className={styles.modalHeader}>
            <TextContent post={post} />

            <div className={styles.karmaCounter}>
              <button className={styles.up}>
                <Icon name={EIcons.upIcon} />
              </button>
              <span className={styles.karmaValue}>{post?.karma}</span>
              <button className={styles.down}>
                <Icon name={EIcons.downIcon} />
              </button>
            </div>

          </div>

          <div className={styles.content}>
            <Preview post={post} />
            {post?.title}
          </div>

          <CommentFormContainer name={name} />
          <div className={styles.divider}></div>
          {comments.map((comment) => <CommentList key={comment.id} name={name} comment={comment.data} /> )}
        </div>)}

        {!post && (<div className={styles.modal} ref={ref}><NotFoundPage type='post'/></div>)}
      </>
  ), node);
}
