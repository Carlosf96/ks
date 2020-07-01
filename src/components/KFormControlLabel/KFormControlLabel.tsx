import clsx from 'clsx';
import React, { FC } from 'react';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';

import styles from './KFormControlLabel.module.scss';

interface IFormControlLabelProps extends FormControlLabelProps {
  tab?: boolean;
}

const KFormControlLabel: FC<IFormControlLabelProps> = ({
  tab,
  ...formProps
}) => {
  return (
    <FormControlLabel
      className={clsx(formProps.className, { [styles.tab]: tab })}
      labelPlacement="end"
      {...formProps}
    />
  );
};

export default KFormControlLabel;
