import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core/';

import styles from '../util/styles';
import theme from './theme';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NoImage from '../images/no-img.png';

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImage} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.profileSkeletonHandle} />
          <hr />
          <div className={classes.skeletonFullLine} />
          <div className={classes.skeletonFullLine} />
          <hr />
          <LocationOnIcon color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> <span style={{ color: theme.palette.primary.main }}> https://website.com</span>
          <hr />
          <CalendarTodayIcon color="primary" /> <span>Joined date</span>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
