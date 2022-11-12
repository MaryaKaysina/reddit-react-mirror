import React from 'react';
import styles from './searchblock.css';
import { UserBlock } from './UserBlock';
import { useUserData } from '../../../hooks/useUserData';
import { EIcons, Icon } from '../../Icon';
import { MessageBlock } from './MessageBlock';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

export function SearchBlock() {
  const token = useSelector<RootState, string>(state => state.token.token);
  const { data, loading } = useUserData();

  return (
    <div className={styles.searchBlock}>
      { token && token !== 'undefined' && <MessageBlock /> }
      <label className={styles.label} htmlFor="search">Поиск</label>
      <span className={styles.searchIcon}>
        <Icon name={EIcons.searchIcon} />
      </span>
      <input className={styles.input} type="text" id='search' placeholder='Поиск'/>
      <UserBlock avatarSrc={data.iconImg} username={data.name} loading={loading} />
    </div>
  );
}


