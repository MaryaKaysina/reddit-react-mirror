import React from 'react';
import { useSelector } from 'react-redux';
import { useCommentsData } from '../../../../hooks/useCommentsData';
import { IComments } from '../../../../store/comments/actions';
import { CommentsState } from '../../../../store/comments/reducer';
import { RootState } from '../../../../store/reducer';
import { EIcons, Icon } from '../../../Icon';
import styles from './controls.css';

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
}

interface IPostsData {
  post: IPostItem;
}

export function Controls({ post }: IPostsData) {
  const comments = useSelector<RootState, any[]>(state => state.commentsPost.commentsData.data);

  return (
    <div className={styles.controls}>
      <div className={styles.karmaCounter}>
        <button className={styles.up}>
          <Icon name={EIcons.upIcon} />
        </button>
        <span className={styles.karmaValue}>{post.karma}</span>
        <button className={styles.down}>
          <Icon name={EIcons.downIcon} />
        </button>
      </div>

      <button className={styles.commentsButton}>
        <Icon name={EIcons.commentIconInControl} />
        <span className={styles.commentsNumber}>{comments.length}</span>
      </button>

      <div className={styles.actions}>
        <button className={styles.shareIconInCircle}>
          <Icon name={EIcons.shareIconInCircle} size={20}/>
        </button>

        <button className={styles.saveButton}>
          <Icon name={EIcons.saveInCircle} size={20}/>
        </button>
      </div>
    </div>
  );
}
