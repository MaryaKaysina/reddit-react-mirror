import React from 'react';
import { Break } from '../../../Break';
import { IconAnon } from '../../../Icons';
import { EColors, Text } from '../../../Text';
import styles from './userblock.css';

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {
  const href = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT}&duration=permanent&scope=read submit identity`;

  return (
    <a
      href={href}
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt='User avatar' className={styles.avatarImage} />
          : <IconAnon/>
        }
      </div>

      <div className={styles.username}>
        <Break size={12}/>
        {loading ? (
          <Text size={20} color={EColors.grey99}>Loading ...</Text>
        ) : (
          <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Аноним'}</Text>
        )}
      </div>
    </a>
  );
}
