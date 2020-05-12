import React, { FC } from 'react';
import { Alert as MaterialAlert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

type AlertProps = {
  title: string;
  children: string;
};

const useStyles = makeStyles(theme => ({
  alert: {
    marginBottom: theme.spacing(3),
  },
}));

export const Alert: FC<AlertProps> = ({ title, children }) => {
  const styles = useStyles();
  return (
    <MaterialAlert
      data-testid={'alert-container'}
      severity="error"
      className={styles.alert}
    >
      <AlertTitle data-testid={'alert-title'}> {title} </AlertTitle>
      {children}
    </MaterialAlert>
  );
};
