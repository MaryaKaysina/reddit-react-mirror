import React from 'react';
import styles from './icon.css';
import {
  BlockIcon,
  WarningIcon,
  CommentIcon,
  SaveIcon,
  ShareIcon,
  SaveIconInCircle,
  ShareIconInCircle,
  CommentIconInControl,
  UpIcon,
  DownIcon,
  BestIcon,
  DownLineIcon,
  HotIcon,
  NewIcon,
  TopIcon,
  LongIcon,
  ThreadlineIcon,
  MessageIcon
} from '../Icons';
import { SearchIcon } from '../Icons/SearchIcon';

export enum EIcons {
  block = 'BlockIcon',
  warning = 'WarningIcon',
  comment = 'CommentIcon',
  save = 'SaveIcon',
  share = 'ShareIcon',
  saveInCircle = 'SaveIconInCircle',
  shareIconInCircle = 'ShareIconInCircle',
  commentIconInControl = 'CommentIconInControl',
  upIcon = 'UpIcon',
  downIcon = 'DownIcon',
  bestIcon = 'BestIcon',
  downLineIcon = 'DownLineIcon',
  hotIcon = 'HotIcon',
  newIcon = 'NewIcon',
  topIcon = 'TopIcon',
  longIcon = 'LongIcon',
  threadlineIcon = 'ThreadlineIcon',
  searchIcon = 'SearchIcon',
  messageIcon = 'MessageIcon',
}

type TSizes = 20 | 16 | 14;

interface IIconProps {
  name: EIcons;
  size?: TSizes;
}

const sizeIcons = {
  14: styles.smallIcon,
  16: styles.middleIcon,
  20: styles.largeIcon,
}

const icons = {
  [EIcons.block]: <BlockIcon />,
  [EIcons.warning]: <WarningIcon />,
  [EIcons.comment]: <CommentIcon />,
  [EIcons.save]: <SaveIcon />,
  [EIcons.share]: <ShareIcon />,
  [EIcons.saveInCircle]: <SaveIconInCircle />,
  [EIcons.shareIconInCircle]: <ShareIconInCircle />,
  [EIcons.commentIconInControl]: <CommentIconInControl />,
  [EIcons.upIcon]: <UpIcon />,
  [EIcons.downIcon]: <DownIcon />,
  [EIcons.bestIcon]: <BestIcon />,
  [EIcons.downLineIcon]: <DownLineIcon />,
  [EIcons.hotIcon]: <HotIcon />,
  [EIcons.newIcon]: <NewIcon />,
  [EIcons.topIcon]: <TopIcon />,
  [EIcons.longIcon]: <LongIcon />,
  [EIcons.threadlineIcon]: <ThreadlineIcon />,
  [EIcons.searchIcon]: <SearchIcon />,
  [EIcons.messageIcon]: <MessageIcon />,
}

export function Icon({ name, size = 16 }: IIconProps) {
  return (
    <div className={sizeIcons[size]}>{icons[name]}</div>
  );
}
