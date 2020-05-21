import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React, { FC, MouseEventHandler } from 'react';
import { PrimaryButton } from './PrimaryButton';

type AlertDialogProps = {
  alertDialogOpen: boolean;
  onCloseDialog: MouseEventHandler;
  onAcceptDialog: MouseEventHandler;
  title: string;
  text: string;
};

export const AlertDialog: FC<AlertDialogProps> = ({
  onCloseDialog,
  alertDialogOpen,
  onAcceptDialog,
  title,
  text,
}) => {
  return (
    <div>
      <Dialog
        open={alertDialogOpen}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClickHandler={onCloseDialog}>No</PrimaryButton>
          <PrimaryButton onClickHandler={onAcceptDialog}>Yes</PrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
