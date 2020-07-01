import * as React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import {
  CircularProgress,
  CircularProgressProps,
} from '@material-ui/core/';

const theme = createMuiTheme({
  overrides: {
    MuiCircularProgress: {
      colorPrimary: {
        color: '#f74e4f',
      },
    },
  },
});

const KLoader: React.FC<CircularProgressProps> = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <CircularProgress {...props} />
    </MuiThemeProvider>
  );
};

export default KLoader;
