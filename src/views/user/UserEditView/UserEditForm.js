import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import useUser from 'src/hooks/useUser';
import { useHistory } from 'react-router-dom';
import AlertP from 'src/components/Alert';
import { useParams } from 'react-router';
import { CapitalizeNames } from 'src/utils/capitalize';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  FormHelperText,
  Divider,
  CardHeader
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserEditForm = ({
  className,
  user,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { updateUser, error } = useUser();
  const history = useHistory();
  const [submitedForm, setSubmitedForm] = useState(false);
  const route = useParams();
  const { t } = useTranslation()

  useEffect(() => {
    if(submitedForm){
      if(!error){
        enqueueSnackbar(t("SnackBar.UserUpdated"), {
          variant: 'success'
        });
        history.push(`/app/management/users/${route.id}`);
      }
      setSubmitedForm(false)
    }

    // eslint-disable-next-line
  }, [submitedForm]);


  return (
    <Formik
      initialValues={{
        name: CapitalizeNames(user.name) || '',
        email: user.email || '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255),
        email: Yup.string().email(t("Yup.Email")).max(255).required(t("Yup.EmailReq")),

      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await updateUser(values, route.id);
          setSubmitedForm(true);


        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
          <CardHeader title= {t("Titles.EditUser")} />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label={t("Users.Name")}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label={t("Users.Email")}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid> 
              </Grid>
              {error && <AlertP severity="error" msg={error.error}/>}

              {errors.submit && (
                    <Box mt={3}>
                      <FormHelperText error>
                        {errors.submit}
                      </FormHelperText>
                    </Box>
                  )}
              <Box  mt={2}
                  display="flex"
                  justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t("Buttons.Edit")} {t("Users.User")} 
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

UserEditForm.propTypes = {
  className: PropTypes.string,
};

export default UserEditForm;
