import React from 'react';
import styles from './KHeader.module.scss';

import clsx from 'clsx';
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft } from '@material-ui/icons';

interface IKHeaderProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
}

const KHeader: React.FC<IKHeaderProps> = ({
  handleDrawerOpen,
  handleDrawerClose,
  isOpen,
}) => (
  <AppBar position="static" className={clsx(styles.appBar)}>
    <Toolbar variant="dense">
      {isOpen ? (
        <IconButton
          color="inherit"
          onClick={handleDrawerClose}
          className={styles['close-drawer']}
        >
          <ChevronLeft />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(styles['menu-button'])}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Typography variant="h6" noWrap>
        KS HIRE
      </Typography>
    </Toolbar>
  </AppBar>
);

export default KHeader;
