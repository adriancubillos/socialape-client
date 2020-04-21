import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

class LikeButton extends Component {
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.screamId))
      return true;
    return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };

  render() {
    console.log('@@@### PROPS ###@@@', this.props);

    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like" tipPlacement="top">
          <FavoriteBorderIcon color="secondary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Remove like" tipPlacement="top" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" tipPlacement="top" onClick={this.likeScream}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
