import React, { FC } from 'react';
import {
  TableContainer,
  TableContainerProps,
} from '@material-ui/core';

interface IProps extends TableContainerProps {}

const KTableContainer: FC<IProps> = props => {
  return <TableContainer {...props} />;
};

export default KTableContainer;
