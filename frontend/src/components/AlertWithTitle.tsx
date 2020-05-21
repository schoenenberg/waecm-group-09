import React, { FC } from 'react';
import { Alert as MaterialAlert, AlertTitle } from '@material-ui/lab';
import { Color } from '@material-ui/lab/Alert/Alert';
import { makeStyles } from '@material-ui/core/styles';

type AlertProps = {
  title: string;
  severity?: Color;
  children: string;
};

const useStyles = makeStyles(theme => ({
  alert: {
    marginBottom: theme.spacing(3),
  },
}));

export const AlertWithTitle: FC<AlertProps> = ({
  title,
  severity = 'error',
  children,
}) => {
  const styles = useStyles();
  return (
    <MaterialAlert
      data-testid={'alert-container'}
      severity={severity}
      className={styles.alert}
    >
      <AlertTitle data-testid={'alert-title'}> {title} </AlertTitle>
      {children}
    </MaterialAlert>
  );
};
