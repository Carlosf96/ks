import React from 'react';
import MomentUtils from '@date-io/moment';
import styles from './KDatePicker.module.scss';
import {
  createMuiTheme,
  ThemeProvider,
  PopoverProps as IPopoverProps,
  IconButtonProps,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey
    extends overridesNameToClassKey {}
}

const colors = {
  gray: '#e3e3e3',
  grayDark: '#717171',
  grayLigth: '#f8f8f8',
  red: '#f74e4f',
};

const baseTheme = (svgColor: string) =>
  createMuiTheme({
    overrides: {
      MuiFormControl: {
        root: {
          border: `0.125rem solid ${colors.gray}`,
          borderRadius: '2%',
          color: colors.grayDark,
          maxWidth: '24rem',
          padding: '0.5rem 0 0.5rem 0.75rem',
          width: '100%',

          '& .MuiInput-underline': {
            '&:after': {
              borderBottom: 'none',
            },
            '&:before': {
              borderBottom: 'none',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: 'none',
            },
            '&.Mui-disabled:before': {
              borderBottomStyle: 'none',
            },
          },
          '& .MuiIconButton-root': {
            color: colors.grayDark,
          },
          '& .MuiSvgIcon-root': {
            color: svgColor,
          },
        },
        marginNormal: {
          marginTop: '0',
          marginBottom: '0',
        },
      },
    },
  });

const KDatePicker: React.FC<KeyboardDatePickerProps> = props => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleIsOpen = () => setIsOpen(isOpen => !isOpen);
  const customTheme = baseTheme(
    isOpen ? colors.red : colors.grayDark,
  );

  const {
    KeyboardButtonProps,
    PopoverProps,
    leftArrowButtonProps,
    rightArrowButtonProps,
    ...otherProps
  } = props;

  const keyboardButtonProps: Partial<IconButtonProps> = {
    ...KeyboardButtonProps,
    'aria-label': 'change date',
  };

  const popOverProps: Partial<IPopoverProps> = {
    ...PopoverProps,
    anchorOrigin: {
      horizontal: 'left',
      vertical: 'bottom',
    },
    transformOrigin: {
      horizontal: 'left',
      vertical: 'top',
    },
    classes: {
      ...PopoverProps?.classes,
      paper: styles.datePickerCalendar,
    },
  };

  const leftArrowProps: Partial<IconButtonProps> = {
    ...leftArrowButtonProps,
    classes: {
      ...leftArrowButtonProps?.classes,
      root: styles.datePickerArrowIcon,
    },
  };

  const rightArrowProps: Partial<IconButtonProps> = {
    ...rightArrowButtonProps,
    classes: {
      ...rightArrowButtonProps?.classes,
      root: styles.datePickerArrowIcon,
    },
  };

  return (
    <ThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          KeyboardButtonProps={keyboardButtonProps}
          onClose={toggleIsOpen}
          onOpen={toggleIsOpen}
          PopoverProps={popOverProps}
          leftArrowButtonProps={leftArrowProps}
          rightArrowButtonProps={rightArrowProps}
          {...otherProps}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

KDatePicker.defaultProps = {
  disableToolbar: true,
  format: 'DD/MM/YYYY',
  placeholder: 'dd/mm/yyyy',
  variant: 'inline',
};

export default KDatePicker;
