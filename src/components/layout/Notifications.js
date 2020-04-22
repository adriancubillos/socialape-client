import React, { Component, Fragment } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, Typography, Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);

    this.props.markNotificationsRead(unreadNotificationIds);
  };

  render() {
    const { notifications } = this.props;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;

    if (notifications && notifications.length > 0) {
      notifications.filter((notification) => notification.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={notifications.filter((notification) => notification.read === false).length}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => {
          const verb = notification.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? 'primary' : 'secondary';
          const icon =
            notification.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                to={`/users/${notification.recipient}/scream/${notification.screamId}`}
                color="inherit"
                variant="body1"
              >
                {notification.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>You don't have new notifications</MenuItem>
      );

    return (
      <Fragment>
        <Tooltip title="Notifications" placement="bottom">
          <IconButton
            aria-controls={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

const mapDispatchToProps = {
  markNotificationsRead
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
