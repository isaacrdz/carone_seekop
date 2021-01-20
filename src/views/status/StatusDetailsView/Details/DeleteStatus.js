import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';  
import useStatus from 'src/hooks/useStatus';
import { useParams, useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import SimpleDialog from 'src/components/SimpleDialog'

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    makeStyles,
  } from '@material-ui/core';
  import {
    Delete as DeleteIcon
  
  } from 'react-feather';
import { useTranslation } from 'react-i18next';
  
  const useStyles = makeStyles((theme) => ({
    root: {},
    cell: {
      padding: theme.spacing(1)
    },
    error: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: "#d0392e"
      }
    },
  }));
  
  const DeleteStatus = ({ className, ...rest }) => {
    const classes = useStyles();
    const { t } = useTranslation()
    const { deleteStatus, getStatuses } = useStatus();
    const route = useParams();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();  
    const [open, setOpen] = React.useState(false);

    const handleClose = async (value) => {
      setOpen(false);
      if(value === 'yes'){      
        deleteStatus(route.id);
        getStatuses();
        enqueueSnackbar(t("SnackBar.StatusDeleted"), {
          variant: 'error'
        });
        history.push("/app/management/status");
      }
    };

    const handleDelete = () =>{
        setOpen(true)
    }
    
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <SimpleDialog open={open} onClose={handleClose} />

        <CardHeader title="Delete" />
        <Divider />
        <CardContent>
            <Box
              mt={2}
            >
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    className={classes.error}
                    >
                    {t("Buttons.Delete")} {t("Status.Status")}
                </Button>
            </Box>
        </CardContent>
      </Card>
    );
  };
  
  DeleteStatus.propTypes = {
    className: PropTypes.string,
  };
  
  export default DeleteStatus;
  