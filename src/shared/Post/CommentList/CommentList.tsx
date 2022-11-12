import React from 'react';
import styles from './commentlist.css';
import { CommentControls } from '../CommentControls';
import { EIcons, Icon } from '../../Icon';
import { generateId } from '../../../utils/react/generateRandomIndex';

interface IComment {
  author?: string;
  body?: string;
  created?: string;
  replies?: ICommentsContextItem;
  children?: IComment[];
  data?: IComment;
}

interface ICommentsContextItem {
  author?: string;
  avatar?: string;
  preview?: string;
  url?: string;
  title?: string;
  created?: string;
  karma?: string;
  postId?: string;
  subreddit?: string;
  data?: IComment;
}

interface ICommentForm {
  name?: string;
  comment?: IComment;
}

export function CommentList({ name, comment }: ICommentForm) {
  const now = Date.parse((new Date()).toDateString());

  const newPostCreated = Number(comment?.created) * 900;

  const published = Math.ceil((now - newPostCreated) / 1000 / 60 / 60);

  const createdAt = published < 12
  ? `${published} часа назад`
  : new Date(newPostCreated).toLocaleDateString();

  if (createdAt === 'Invalid Date') return null;

  const repliesList = comment?.replies?.data?.children?.map(generateId);

  return (
    <div className={styles.commentBlock}>
      <div className={styles.threadline}>
        <Icon name={EIcons.threadlineIcon}/>
        <span className={styles.line}></span>
      </div>
      <ul className={styles.list}>
        <li>
          <div className={styles.metaData}>
            <div className={styles.userLink}>
              <img
                className={styles.avatar}
                src="https://www.ispwp.com/ProfileImages/user-6201/d9f36bb0-bb4c-4d4e-b03f-8ee370572a2d-79144d63550de7603b4d0d0d9e030c79.jpg"
                alt='avatar'
              />
              <a href='#user-url' className={styles.username}>{comment?.author}</a>
            </div>
            <span className={styles.createdAt}>
              {createdAt}
            </span>
            <span className={styles.tag}>Лига программистов</span>
          </div>
          <p className={styles.commentText}>
            {comment?.body}
          </p>
          <div className={styles.controls}>
            <CommentControls name={comment?.author}/>
          </div>
          {repliesList?.map((comment) =>
            <CommentList key={comment.id} name={name} comment={comment.data} /> )
          }
        </li>
      </ul>
    </div>
  );
}
