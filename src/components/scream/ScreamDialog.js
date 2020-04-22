import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, CircularProgress, Grid, Typography, Link, Dialog, DialogContent } from '@material-ui/core';
import MyButton from '../../util/MyButton';
import styles from '../../util/styles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { getScream } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

class ScreamDialog extends Component {
  state = {
    open: false,
    newPath: '',
    oldPath: ''
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, newPath, oldPath });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.screamDialogImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
            @{userHandle}{' '}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography color="textSecondary" variant="body2">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1"> {body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments" tipPlacement="top">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        {comments && comments.length > 0 && <hr className={classes.visibleSeparator} />}
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          tip="Expand scream"
          tipPlacement="top"
          onClick={this.handleOpen}
          tipClassName={classes.expandScreamButton}
        >
          <UnfoldMoreIcon color="primary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeScreamDialogButton}>
            <CloseIcon color="primary" />
          </MyButton>
          <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapDispatchToProps = {
  getScream
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScreamDialog));
