import React, { Component } from 'react';
import { withStyles, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    width: 85,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

class Scream extends Component {
  render() {
    const {
      classes,
      scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} className={classes.image} />
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {createdAt}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
