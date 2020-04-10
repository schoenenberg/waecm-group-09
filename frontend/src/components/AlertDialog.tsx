import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {FC, MouseEventHandler, useState} from "react";
import {PrimaryButton} from "./PrimaryButton";

type AlertDialogProps = {
    onAcceptDialog: MouseEventHandler;
    title: string;
    text: string;
    buttonOpenText: string;
};

export const AlertDialog: FC<AlertDialogProps> =  ({onAcceptDialog, title, text, buttonOpenText}) =>  {
    const [alertDialogOpen, setAlertDialogOpen] = useState(false); // refers to alert dialog

    return (
        <div>
            <PrimaryButton
                onClickHandler={() =>setAlertDialogOpen(true)}
            >
                {buttonOpenText}
            </PrimaryButton>
            <Dialog
                open={alertDialogOpen}
                onClose={() =>setAlertDialogOpen(false)}
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
                        onClickHandler={() =>setAlertDialogOpen(false)}
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