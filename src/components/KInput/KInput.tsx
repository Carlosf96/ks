import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { textFieldTheme } from 'src/styles/theme';

interface ITextFieldProps {}

type MyProps = ITextFieldProps & TextFieldProps;

const KInput: React.FC<MyProps> = props => {
  const { error, variant } = props;
  const errorSvg = '/assets/error-input-icon.svg';
  const myVariant = variant ?? 'standard';

  return (
    <MuiThemeProvider theme={textFieldTheme}>
      <TextField
        {...props}
        fullWidth
        InputProps={{
          endAdornment: error && (
            <InputAdornment position="end">
              <img src={errorSvg} alt="error" />
            </InputAdornment>
          ),
        }}
        // Used any for documented typescript error with material ui
        //https://stackoverflow.com/questions/55664421/how-do-i-pass-in-the-variant-property-of-the-material-ui-textfield-from-a-wrappi
        variant={myVariant as any}
      />
    </MuiThemeProvider>
  );
};

export default KInput;
