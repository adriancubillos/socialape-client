import React, { Fragment } from 'react';
import NoImage from '../images/no-img.png';
import PropTypes from 'prop-types';
import { withStyles, Card, CardMedia, CardContent } from '@material-ui/core';
import styles from '../util/styles';

const ScreamSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.skeletonCard} key={index}>
      <CardMedia className={classes.skeletonCover} image={NoImage} />
      <CardContent className={classes.skeletonContent}>
        <div className={classes.skeletonHandle} />
        <div className={classes.skeletonDate} />
        <div className={classes.skeletonFullLine} />
        <div className={classes.skeletonFullLine} />
        <div className={classes.skeletonHalfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);
