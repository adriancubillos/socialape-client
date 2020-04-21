import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, CircularProgress, Grid, Typography, Link, Dialog, DialogContent } from '@material-ui/core';
import MyButton from '../util/MyButton';
import styles from '../util/styles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { getScream } from '../redux/actions/dataActions';
import LikeButton from './LikeButton';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

class ScreamDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
            @{userHandle}{' '}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography color="textSecondary" variant="body2">
            {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
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
          {/* <DialogTitle>Post a scream</DialogTitle> */}
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
