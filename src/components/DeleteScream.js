import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';
import { Dialog, DialogTitle, DialogActions, Button, withStyles } from '@material-ui/core';
import styles from '../util/styles';

class DeleteScream extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleDelete = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton tip="Delete scream" tipPlacement="top" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
          <DeleteOutlineIcon color="secondary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Are You sure You want to delete this scream ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapDispatchToProps = {
  deleteScream
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DeleteScream));
