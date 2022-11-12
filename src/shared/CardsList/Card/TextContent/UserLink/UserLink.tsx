import React from 'react';
import { IconAnon } from '../../../../Icons';
import styles from './userlink.css';

interface IPostItem {
  author?: string;
  avatar?: string;
  preview?: string;
  url?: string;
  title?: string;
  created?: string;
  karma?: string;
}

interface IPostsData {
  post: IPostItem;
}

export function UserLink({ post }: IPostsData) {
  return (
    <div className={styles.userLink}>
      {post.avatar
        ? <img src={post.avatar} alt='avatar' className={styles.avatar} />
        : <div className={styles.avatar}>
            <IconAnon size={20} />
          </div>
      }
      <a href='#user-url' className={styles.username}>{post.author}</a>
    </div>
  );
}
