import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next'
import {
  Breadcrumbs,
  Link,
  Typography,
  makeStyles,
  SvgIcon,
  Button,
  Grid
} from '@material-ui/core';
import { ArrowLeft as BackIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app/management/omsLeads"
            component={RouterLink}
          >
            {t("BreadCumbs.Management")}
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            {t("BreadCumbs.Leads")}
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {t("BreadCumbs.Create")}{t("Leads.Lead")}
        </Typography>
      
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <BackIcon />
            </SvgIcon>
          }
          component={RouterLink}
          to="/app/management/omsLeads"
        >
        
            {t("Buttons.GoBack")}
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
