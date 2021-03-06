import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core/';
import styles from '../../util/styles';
import { editUserDetails } from '../../redux/actions/userActions';
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../../util/MyButton';

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };

  handleOpen = () => {
    const { credentials } = this.props;
    this.setState({ open: true });
    this.mapUserDetailsToState(credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit profile details"
          tipPlacement="top"
          onClick={this.handleOpen}
          btnClassName={classes.editProfileButton}
        >
          <EditIcon color="primary" />
        </MyButton>

        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

const mapDispatchToProps = {
  editUserDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDetails));
