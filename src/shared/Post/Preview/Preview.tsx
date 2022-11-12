import React from 'react';
import styles from './preview.css';

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
  post: IPostItem;
}

export function Preview({ post }: IPostsData) {
  return (
    <div className={styles.preview}>
      {(post.banner && post.banner?.includes('http'))
        ? <img src={post.banner} className={styles.previewImg} />
        : <img
            className={styles.previewImg}
            src=''
          />
      }
    </div>
  );
}
