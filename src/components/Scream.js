import React, { Component } from 'react';
import { withStyles, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteScream from './DeleteScream';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    width: 85
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Scream extends Component {
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.scream.screamId))
      return true;
    return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorderIcon color="secondary" />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Remove like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    );

    const deleteButton = authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null;

    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} className={classes.image} />
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments" tipPlacement="top">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream));
