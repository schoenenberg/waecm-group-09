import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {FC, MouseEventHandler} from "react";
import {PrimaryButton} from "./PrimaryButton";

type AlertDialogProps = {
    alertDialogOpen: boolean;
    onCloseAlertDialog: MouseEventHandler;
    onAcceptDialog: MouseEventHandler; 
    title: string;
    text: string;
};

export const AlertDialog: FC<AlertDialogProps> =  ({onCloseAlertDialog, alertDialogOpen, onAcceptDialog, title, text}) =>  {
    return (
        <div>
            <Dialog
                open={alertDialogOpen}
                onClose={onCloseAlertDialog}
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
                    <PrimaryButton
                        onClickHandler={onCloseAlertDialog}
                    >
                        No
                    </PrimaryButton>
                    <PrimaryButton
                        onClickHandler={onAcceptDialog}
                    >
                        Yes
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </div>);
}