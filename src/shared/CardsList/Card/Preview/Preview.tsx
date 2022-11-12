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
}

interface IPostsData {
  post: IPostItem;
}

export function Preview({ post }: IPostsData) {
  return (
    <div className={styles.preview}>
      {(post.preview && post.preview?.includes('http'))
        ? <img src={post.preview} className={styles.previewImg} />
        : <img
            className={styles.previewImg}
            src='https://previews.123rf.com/images/pavlostv/pavlostv1805/pavlostv180500401/101741080-oops-404-error-page-not-found.-futuristic-robot-concept-%C3%A2%E2%82%AC%E2%80%9C-vector.jpg'
          />
      }
    </div>
  );
}
