import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './menu.css';
import { MenuIcon } from '../../../Icons';
import { Text, EColors } from '../../../Text';
import { MenuItemsList } from './MenuItemsList';

interface IPosition {
  top: number;
  left: number;
}

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

export function Menu({ post }: IPostsData) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<IPosition>({ top: 0, left: 0 });

  function getPosition() {
    setTimeout(() => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setPosition({ top: rect.top, left: rect.left })
      }
    }, 500)
  };

  useEffect(() => {
    getPosition();
    window.addEventListener('resize', getPosition)
    window.addEventListener('scroll', getPosition)

  }, []);

  return (
    <div className={styles.menu}>
      <div>
          <Dropdown
            button={
              <button
                data-id={post.postId}
                className={styles.menuButton}
                ref={btnRef}
              >
                <MenuIcon/>
              </button>
            }
            position={position}
          >
            <div className={styles.dropdown}>
              <MenuItemsList postId={post.postId}/>
              <button className={styles.closeButton}>
                <Text mobileSize={12} size={14} color={EColors.grey66}>
                  Закрыть
                </Text>
              </button>
            </div>
          </Dropdown>
        </div>
    </div>
  );
}

