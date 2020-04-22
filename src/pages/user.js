import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserByHandleData } from '../redux/actions/dataActions';
import axios from 'axios';
import { Grid, Typography, Paper } from '@material-ui/core';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton.js';
import AddIcon from '@material-ui/icons/Add';
import MyButton from '../util/MyButton';

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };

  componentDidMount() {
    // match contains details about the Url (pathname, baseUrl, etc)
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }

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
    const { screamIdParam } = this.state;

    let screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null || screams.length === 0 ? (
      <Paper elevation={3} style={{ padding: 25 }}>
        <Typography variant="body1">
          You don't have any screams yet. Post a scream using the{' '}
          <MyButton tip="" tipPlacement="bottom" btnClassName="postHint">
            <AddIcon color="primary" />
          </MyButton>{' '}
          in the navigation bar.
        </Typography>
      </Paper>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} />;
        }
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? <ProfileSkeleton /> : <StaticProfile profile={this.state.profile} />}
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
