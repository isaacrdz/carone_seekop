import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';  
import useUser from 'src/hooks/useUser';
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
  
  const DeleteUser = ({ className, ...rest }) => {
    const classes = useStyles();
    const { t } = useTranslation()
    const { deleteUser } = useUser();
    const route = useParams();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();  

    const [open, setOpen] = useState(false);

    const handleClose = async (value) => {
      setOpen(false);
      if(value === 'yes'){      
        deleteUser(route.id);
        enqueueSnackbar(t("SnackBar.UserDeleted"), {
          variant: 'error'
        });
        history.push("/app/management/users");
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

        <CardHeader title={t("Buttons.Delete")} />
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
                    {t("Buttons.Delete")} {t("Users.User")}
                </Button>
            </Box>
        </CardContent>
      </Card>
    );
  };
  
  DeleteUser.propTypes = {
    className: PropTypes.string,
  };
  
  export default DeleteUser;
  