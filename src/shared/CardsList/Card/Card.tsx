import React from 'react';
import styles from './card.css';
import { TextContent } from './TextContent';
import { Preview } from './Preview';
import { Menu } from './Menu';
import { Controls } from './Controls';

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

export function Card( { post}: IPostsData) {
  return (
    <li className={styles.card} id={post.postId}>
      <TextContent post={post} />
      <Preview post={post} />
      <Menu post={post} />
      <Controls post={post} />
    </li>
  );
}
