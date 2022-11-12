import React, { useState } from 'react';
import styles from './title.css';

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

export function Title({ post }: IPostsData) {
  return (
    <h2 className={styles.title}>
        {post.title}
    </h2>
  );
}

