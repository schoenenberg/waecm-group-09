import Button from '@material-ui/core/Button';
import React, { FC, MouseEventHandler } from 'react';
import { makeStyles } from '@material-ui/core/styles';

type PrimaryButtonProps = {
  onClickHandler: MouseEventHandler;
  disabled?: boolean;
  children: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    background: 'linear-gradient(45deg, #b3cce6 30%, #c6d9ec 90%)',
    borderRadius: 3,
    border: 0,
    color: '#132639',
    height: 48,
    boxShadow: '0 5px 7px 4px rgba(19, 38, 57, .5)',
  },
}));

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClickHandler,
  disabled = false,
  children,
}) => {
  const styles = useStyles();

  return (
    <Button
      fullWidth
      variant="contained"
      className={styles.button}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
