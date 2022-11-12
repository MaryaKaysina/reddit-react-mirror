import React from 'react';
import styles from './sortitemslist.css';
import classNames from 'classnames';
import { Text, EColors } from '../../../../shared/Text';
import { EIcons, Icon } from '../../../../shared/Icon';
import { GenericList } from '../../../../shared/GenericList';
import { generateId } from '../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../utils/js/merge';

interface ISortItemsList {
  item: string;
}

const LIST = [
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.bestIcon} />
      <Text mobileSize={12} size={20} color={EColors.grey99}>Лучшие</Text>
    </>,
    className: classNames(styles.menuItem),
  },
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.hotIcon} />
      <Text mobileSize={12} size={20} color={EColors.grey99}>Жаркие</Text>
    </>,
    className: classNames(styles.menuItem),
  },
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.newIcon} />
      <Text mobileSize={12} size={20} color={EColors.grey99}>Новые</Text>
    </>,
    className: styles.menuItem,
  },
  {
    As: 'li' as const,
    element:
      <>
        <Icon name={EIcons.topIcon} />
        <Text mobileSize={12} size={20} color={EColors.grey99}>Топовые</Text>
      </>,
    className: classNames(styles.menuItem),
  },
  {
    As: 'li' as const,
    element:
      <>
        <Icon name={EIcons.longIcon} />
        <Text mobileSize={12} size={20} color={EColors.grey99}>Длительные</Text>
      </>,
    className: styles.menuItem,
  },
].map(generateId);


export function SortItemsList({ item }: ISortItemsList) {
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
