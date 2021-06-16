import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import CustomerInfo from './CustomerInfo';
import PostAdd from 'src/components/PostAdd';
import Reviews from 'src/views/project/ProjectDetailsView/Reviews';
import useComment from 'src/hooks/useComment';
import { useParams } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import StatusLead from './StatusLead';
import SendEmail from './SendEmail';
import ModalMail from './ModalMail';
import SendWsp from './sendWsp';
import MakeCall from './makeCall';

const useStyles = makeStyles(theme => ({
  root: {},
  call: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

const Details = ({ customer, className, ...rest }) => {
  const classes = useStyles();
  const { comments, getCommentsByQuestLead, clearState } = useComment();
  const { user } = useAuth();
  const route = useParams();
  const [isMailOpen, setMailOpen] = useState(false);

  useEffect(() => {
    getCommentsByQuestLead(route.id);
    clearState();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={3} md={3} xl={3} xs={12}>
        <CustomerInfo customer={customer} />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <PostAdd style={{ marginBottom: '1em' }} type={'quest'}/>
        <Reviews reviews={comments} /> 
      </Grid>

      <Grid item lg={3} md={3} xl={3} xs={12}>
        <StatusLead lead={route.id} style={{ marginBottom: '1em' }} />

        <SendEmail setMailOpen={setMailOpen} style={{ marginBottom: '1em' }} /> 

        <MakeCall
          user={user}
          customer={customer}
          style={{ marginBottom: '1em' }}
        />


        {/* <SendWsp
          user={user}
          customer={customer}
          style={{ marginBottom: '1em' }}
        /> */}
      
       
        <ModalMail
          isMailOpen={isMailOpen}
          setMailOpen={setMailOpen}
          style={{ marginBottom: '1em' }}
          type='global'
        />

    
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Details;
