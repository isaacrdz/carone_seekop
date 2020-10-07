import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Divider

} from '@material-ui/core';
import Page from 'src/components/Page';
import DocumentCreateForm from './DocumentCreateForm';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DocumentCreateView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Create Document"
    >
      <Container maxWidth="lg">
        <Header />
        <Divider />
        <Box mt={3}>
          <DocumentCreateForm />
        </Box>
      </Container>
    </Page>
  );
};

export default DocumentCreateView;
