import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
//Material-UI stuff
import { AppBar, Toolbar, Button, Tooltip, Snackbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Notifications from './Notifications';
import { logoutUser } from '../../redux/actions/userActions';
import MuiAlert from '@material-ui/lab/Alert';
import store from '../../redux/store';
import { CLEAR_GENERAL_ERRORS } from '../../redux/types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Navbar extends Component {
  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.genErrors) {
      this.setState({ open: true });
    }
    if (!nextProps.UI.genErrors && !nextProps.UI.loading) {
      this.setState({
        open: false
      });
    }
  }

  handleLogout = () => {
    this.props.logoutUser();
    window.history.pushState(null, null, '/');
  };

  handleClose = () => {
    this.setState({
      open: false
    });
    store.dispatch({ type: CLEAR_GENERAL_ERRORS });
  };

  render() {
    const {
      authenticated,
      UI: { genErrors }
    } = this.props;

    return (
      <Fragment>
        {genErrors && (
          <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="error">
              Unexpected error occurred. Please logout and login again.
            </Alert>
          </Snackbar>
        )}
        <AppBar>
          <Toolbar className="nav-container">
            {authenticated ? (
              <Fragment>
                <PostScream />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon />
                  </MyButton>
                </Link>
                <Notifications />
                <Tooltip title="Logout" placement="bottom">
                  <Button color="inherit" component={Link} to="/" onClick={this.handleLogout}>
                    <CancelPresentationIcon />
                  </Button>
                </Tooltip>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  UI: PropTypes.object
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
