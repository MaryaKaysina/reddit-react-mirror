import React from 'react';
import { EIcons, Icon } from '../../../Icon';
import styles from './messageblock.css';

export function MessageBlock() {
  return (
    <div className={styles.messageBlock}>
      <span className={styles.messageCount}>4</span>
      <Icon name={EIcons.messageIcon} />
    </div>
  );
}
