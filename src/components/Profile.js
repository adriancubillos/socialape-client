import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Link as MuiLink, Typography, Button, IconButton, Tooltip } from '@material-ui/core/';
import { connect } from 'react-redux';
import styles from '../util/styles';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import dayjs from 'dayjs';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import EditDetails from './EditDetails';

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
              <Tooltip title="Edit Profile Picture" placement="top">
                <IconButton onClick={this.handleEditPicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOnIcon color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarTodayIcon color="primary" /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout} className={classes.logoutButton}>
                <ExitToAppIcon color="primary" />
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p> Profile Skeleton </p>
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

// user is brought form the global state and mapped into our component props
const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser,
  uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
