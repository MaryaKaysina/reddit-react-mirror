import React, { useEffect, useRef, useState } from 'react';
import styles from './sortblock.css';
import { Dropdown } from '../../../shared/Dropdown';
import { Text, EColors } from '../../../shared/Text';
import { SortItemsList } from './SortItemsList';
import { EIcons, Icon } from '../../Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

interface IPosition {
  top: number;
  left: number;
}

export function SortBlock() {
  const token = useSelector<RootState, string>(state => state.token.token);
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
    <div className={styles.sortBlock}>
      <div>
        <Dropdown
            button={
              <button className={styles.sortButton} ref={btnRef}>
                <Icon name={EIcons.bestIcon} />
                <Text mobileSize={12} size={20} color={EColors.orange}>
                  Лучшие
                </Text>
                <span className={styles.arrow}>
                  <Icon name={EIcons.downLineIcon} />
                </span>
              </button>
            }
            position={position}
          >
            <div className={styles.dropdown}>
              <SortItemsList item='123'/>
            </div>
          </Dropdown>
      </div>
    </div>
  );
}
