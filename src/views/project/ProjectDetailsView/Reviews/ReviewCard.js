import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import Label from 'src/components/Label';

import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  value: {
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  },
  actions:{
    float: 'right'
  },
  capitalize: {
    'text-transform': 'capitalize'
  }
}));

const ReviewCard = ({ className, review, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        avatar={
          <Avatar alt="Reviewer" src={`${process.env.REACT_APP_URL_IMAGE_S3_URL}${review.user.image}`}>
            {getInitials(review.user.name)}
          </Avatar>
        }
        disableTypography
        subheader={
          <Box flexWrap="wrap" display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              {moment(review.createdAt).fromNow()} 
            </Typography>
          </Box>
        }
        title={
          <Typography color="textPrimary" variant="h5">
            
            {review.user.name}

            {
              review.action.map( item => (
              <div className={classes.actions} key={item} style={{marginRight: 10}}>
                <Label 
                className={classes.capitalize}
                key={item}
                color={
                  item === 'mailing' ? 'warning' :
                  item === 'information' ? 'error' :
                  item === 'documentation' ? 'blue' :
                  item === 'calling' ? 'success' : false
                }>
                  {item}
                </Label>
              </div>
              ))
            }
            
          </Typography>
        }
      />
      <Box pb={2} px={3}>
        
        <Typography variant="body2" color="textSecondary">
          {review.comment}
        </Typography>
      </Box>
    </Card>
  );
};

ReviewCard.propTypes = {
  className: PropTypes.string,
  review: PropTypes.object.isRequired
};

export default ReviewCard;
