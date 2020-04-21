import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Typography } from '@material-ui/core';
import styles from '../../util/styles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={classes.commentImage} />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {' '}
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}{' '}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1"> {body} </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {comments.length > 0 && index !== comments.length - 1 && <hr classes={classes.visibleSeparator} />}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  comments: state.data.scream.comments
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comments));
