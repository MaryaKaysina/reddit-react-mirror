import React, { useEffect, useRef } from 'react';
import styles from './menuitemslist.css';
import classNames from 'classnames';
import { Text, EColors } from '../../../../Text';
import { EIcons, Icon } from '../../../../Icon';
import { GenericList } from '../../../../GenericList';
import { generateId } from '../../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../../utils/js/merge';

interface IMenuItemsList {
  postId?: string;
}

const LIST = [
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.comment} size={16}/>
      <Text mobileSize={12} size={14} color={EColors.grey66}>Комментарии</Text>
    </>,
    className: classNames(styles.menuItem, styles.isHide),
  },
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.share} size={16}/>
      <Text mobileSize={12} size={14} color={EColors.grey66}>Поделиться</Text>
    </>,
    className: classNames(styles.menuItem, styles.isHide),
  },
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.block} size={16}/>
      <Text mobileSize={12} size={14} color={EColors.grey66}>Скрыть</Text>
    </>,
    className: styles.menuItem,
  },
  {
    As: 'li' as const,
    element:
      <>
        <Icon name={EIcons.save} size={16}/>
        <Text mobileSize={12} size={14} color={EColors.grey66}>Сохранить</Text>
      </>,
    className: classNames(styles.menuItem, styles.isHide),
  },
  {
    As: 'li' as const,
    element:
      <>
        <Icon name={EIcons.warning} size={16}/>
        <Text mobileSize={12} size={14} color={EColors.grey66}>Пожаловаться</Text>
      </>,
    className: styles.menuItem,
  },
].map(generateId);

export function MenuItemsList({ postId }: IMenuItemsList) {
  const [list, setList] = React.useState(LIST);

  const handleItemClick = (id: string) => {
    // setList(list.filter((item) => item.id !== id));
  }

  return (
    <ul className={styles.menuItemsList}>
      <GenericList
        list={list.map(merge({ onClick: handleItemClick }))}
        divider
        classNameDivider={styles.divider}
      />
    </ul>
  );
}

