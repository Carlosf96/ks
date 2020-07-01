import * as React from 'react';
import CheckboxComponent, {
  CheckboxProps,
} from '@material-ui/core/Checkbox';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from './KCheckbox.module.scss';

export interface ICheckboxProps extends CheckboxProps {
  option?: string;
  tab: boolean;
}

const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      root: {
        color: 'rgba(0, 0, 0, 0)',
        outline: '1px solid #f74e4f',
        '&$disabled': {
          outline: '1px solid #E0D7D7',
        },
        '&$checked': {
          outline: '1px solid #E0D7D7',
        },
      },
    },
  },
});

const KCheckbox: React.FC<ICheckboxProps> = (
  props: ICheckboxProps,
) => {
  const { tab, option, ...otherProps } = props;
  const containerStyles = clsx(styles.container, {
    [styles.tab]: tab,
  });
  return (
    <MuiThemeProvider theme={theme}>
      <div className={containerStyles}>
        <CheckboxComponent {...otherProps} className={styles.root} />
        <span className={styles.option}>{option}</span>
      </div>
    </MuiThemeProvider>
  );
};

export default KCheckbox;
