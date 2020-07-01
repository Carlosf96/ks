import React, { FC } from 'react';
import {
  Toolbar as MaterialToolbar,
  ToolbarProps,
} from '@material-ui/core';
import clsx from 'clsx';

import styles from './KToolbar.module.scss';

interface IProps extends ToolbarProps {
  highlight?: boolean;
}

const KToolbar: FC<IProps> = ({ highlight, ...materialProps }) => {
  return (
    <MaterialToolbar
      {...materialProps}
      className={clsx({ [styles.highlight]: highlight })}
    />
  );
};

export default KToolbar;
