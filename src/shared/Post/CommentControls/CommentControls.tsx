import React from 'react';
import { merge } from '../../../utils/js/merge';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { GenericList } from '../../GenericList';
import { EIcons, Icon } from '../../Icon';
import styles from './commentcontrols.css';
import { Text, EColors } from '../../Text';
import classNames from 'classnames';
import { CommentFormContainer } from '../../CommentFormContainer';

interface ICommentsControlsList {
  commentId?: string;
  name?: string;
}

const LIST = [
  {
    As: 'button' as const,
    element:
    <>
      <Icon name={EIcons.comment} size={16}/>
      <Text mobileSize={12} size={14} color={EColors.grey66}>Ответить</Text>
    </>,
    className: classNames(styles.menuItem, styles.isHide),
  },
  {
    As: 'button' as const,
    element:
    <>
      <Icon name={EIcons.share} size={16}/>
      <Text mobileSize={12} size={14} color={EColors.grey66}>Поделиться</Text>
    </>,
    className: classNames(styles.menuItem, styles.isHide),
  },
  {
    As: 'button' as const,
    element:
      <>
        <Icon name={EIcons.warning} size={16}/>
        <Text mobileSize={12} size={14} color={EColors.grey66}>Пожаловаться</Text>
      </>,
    className: styles.menuItem,
  },
].map(generateId);


export function CommentControls({ commentId, name }: ICommentsControlsList) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleItemClick = () => {
    setIsOpen(true);
  }

  return (
    <>
      <ul className={styles.menuItemsList}>
        <GenericList
          list={LIST.map(merge({ onClick: handleItemClick }))}
          divider
          classNameDivider={styles.divider}
        />
      </ul>
      {isOpen && <CommentFormContainer name={name} isReply/>}
    </>
  );
}
