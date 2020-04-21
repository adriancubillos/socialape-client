import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserByHandleData } from '../redux/actions/dataActions';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

class user extends Component {
  state = {
    profile: null
  };

  componentDidMount() {
    // match contains details about the Url (pathname, baseUrl, etc)
    const handle = this.props.match.params.handle;
    this.props.getUserByHandleData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { screams, loading } = this.props.data;

    let screamsMarkup = loading ? (
      <p>Loading...</p>
    ) : screams === null ? (
      <p>No scream for this user</p>
    ) : (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading User profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserByHandleData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

const mapDispatchToProps = {
  getUserByHandleData
};

export default connect(mapStateToProps, mapDispatchToProps)(user);
