import React from 'react';
import KLayout from './components/KLayout';
import {
  StylesProvider,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import theme from '@/styles/theme';
import AuthModule from '@/modules/Auth';
import KPrivateRoute from '@/components/KPrivateRoute/';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/auth">
              <AuthModule />
            </Route>
            <KPrivateRoute path="/">
              <KLayout />
            </KPrivateRoute>
          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
