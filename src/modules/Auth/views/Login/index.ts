import Login from './Login';
import { connect } from 'react-redux';
import { login } from '@/store/auth/thunks';
import {
  selectorAuthLoading,
  selectorAuthFail,
  selectorAuthData,
} from '@/store/auth/selectors';
import { RootState } from '@/store';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = { login };

const mapStateToProps = (state: RootState) => ({
  loading: selectorAuthLoading(state),
  authError: selectorAuthFail(state),
  authData: selectorAuthData(state),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login),
);
