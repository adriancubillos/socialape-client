import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import styles from '../../util/styles';
import PropTypes from 'prop-types';
import { createComment, clearErrors } from '../../redux/actions/dataActions';
import { Link } from 'react-router-dom';

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
        errors: {}
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      errors: {},
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    this.props.clearErrors();
    event.preventDefault();
    this.props.createComment(this.props.screamId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Add comment"
            variant="outlined"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />

          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Comment
          </Button>
        </form>
      </Grid>
    ) : (
      <Grid container spacing={1}>
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <Typography variant="body2" align="center">
            Login or signup to add comments
          </Typography>
        </Grid>
        <Grid item sm={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
          </Button>
        </Grid>
      </Grid>
    );
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapDispatchToProps = {
  createComment,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentForm));
