import React from 'react';
import { Link } from 'react-router-dom';
import styles from './title.css';

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

export function Title({ post }: IPostsData) {
  return (
    <h2 className={styles.title}>
      <Link to={'/posts/' + post.postId} className={styles.postLink}>
        {post.title}
      </Link>
    </h2>
  );
}

