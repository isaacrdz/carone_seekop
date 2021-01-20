import React, {
    useState,
    useCallback
  } from 'react';
  import clsx from 'clsx';
  import { useDropzone } from 'react-dropzone';
  import PerfectScrollbar from 'react-perfect-scrollbar';
  import PropTypes from 'prop-types';
  import {
    Box,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    makeStyles
  } from '@material-ui/core';
  import FileCopyIcon from '@material-ui/icons/FileCopy';
  import bytesToSize from 'src/utils/bytesToSize';
import { useTranslation } from 'react-i18next';
  
  const useStyles = makeStyles((theme) => ({
    root: {},
    dropZone: {
      border: `1px dashed ${theme.palette.divider}`,
      padding: theme.spacing(6),
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        opacity: 0.5,
        cursor: 'pointer'
      }
    },
    dragActive: {
      backgroundColor: theme.palette.action.active,
      opacity: 0.5
    },
    image: {
      width: 130
    },
    info: {
      marginTop: theme.spacing(1)
    },
    list: {
      maxHeight: 320
    },
    actions: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }));
  
  const FilesDropzone = ({ className, setAttachment, ...rest }) => {
    const classes = useStyles();
    const { t } = useTranslation()
    const [files, setFiles] = useState([]);
  
    const handleDrop = useCallback((acceptedFiles) => {
      setFiles(acceptedFiles);
      setAttachment(acceptedFiles[0])
    //eslint-disable-next-line
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop
    });
  
    return (
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div>
            <img
              alt="Select file"
              className={classes.image}
              src="/static/images/undraw_add_file2_gvbb.svg"
            />
          </div>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              {t("Documents.Select")}

            </Typography>
            <Box mt={2}>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {t("DropzoneInput.Drop")}
                {' '}
                <Link underline="always">{t("DropzoneInput.Browse")}</Link>
                {' '}
                {t("DropzoneInput.Thorough")}
                
              </Typography>
            </Box>
          </div>
        </div>
        {files.length > 0 && (
          <>
            <PerfectScrollbar options={{ suppressScrollX: true }}>
              <List className={classes.list}>
                {files.map((file, i) => (
                  <ListItem
                    divider={i < files.length - 1}
                    key={i}
                  >
                    <ListItemIcon>
                      <FileCopyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      primaryTypographyProps={{ variant: 'h5' }}
                      secondary={bytesToSize(file.size)}
                    />
                  </ListItem>
                ))}
              </List>
            </PerfectScrollbar>
          </>
        )}
      </div>
    );
  };
  
  FilesDropzone.propTypes = {
    className: PropTypes.string
  };
  
  export default FilesDropzone;
  