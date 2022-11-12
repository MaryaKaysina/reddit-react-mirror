import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import styles from './threadtitle.css';

export function ThreadTitle() {
  const token = useSelector<RootState, string>(state => state.token.token);

  return (
    <h1 className={styles.threadTitle}>
      { token === 'undefined' && 'Дискуссии' }
      { token && token !== 'undefined' && 'Личный кабинет' }
    </h1>
  );
}
