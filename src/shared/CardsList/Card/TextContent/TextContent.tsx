import React from 'react';
import styles from './textcontent.css';
import { Title } from './Title';
import { UserLink } from './UserLink';

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

export function TextContent({ post }: IPostsData) {
  const now = Date.parse((new Date()).toDateString());

  const newPostCreated = Number(post.created) * 1000;

  const published = Math.ceil((now - newPostCreated) / 1000 / 60 / 60);

  const createdAt = published < 12
    ? `${published} часа назад`
    : new Date(newPostCreated).toLocaleDateString();

  return (
    <div className={styles.textContent}>
        <div className={styles.metaData}>
          <UserLink post={post} />
          <span className={styles.createdAt}>
            <span className={styles.publishedLabel}>опубликовано </span>
            {createdAt}
          </span>
        </div>
        <Title post={post} />
      </div>
  );
}
