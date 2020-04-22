import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
//Material-UI stuff
import { AppBar, Toolbar, Button, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Notifications from './Notifications';
import { logoutUser } from '../../redux/actions/userActions';

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    window.history.pushState(null, null, '/');
  };

  render() {
    const { authenticated } = this.props;
    return (
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
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
