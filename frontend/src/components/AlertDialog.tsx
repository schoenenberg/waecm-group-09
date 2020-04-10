import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {FC, MouseEventHandler, useState} from "react";
import {PrimaryButton} from "./PrimaryButton";

type NavigationProps = {
    onAcceptDialog: MouseEventHandler;
    title: string;
    text: string;
    buttonOpenText: string;
};

export const AlertDialog: FC<NavigationProps> =  ({onAcceptDialog, title, text, buttonOpenText}) =>  {
    const [alertDialogOpen, setAlertDialogOpen] = useState(false); // refers to alert dialog

    const handleAlertDialogOpen = () => {
        setAlertDialogOpen(true);
    };

    const handleAlertDialogClose = () => {
        setAlertDialogOpen(false);
    };

    return (
        <div>
            <PrimaryButton
                onClickHandler={handleAlertDialogOpen}
            >
                {buttonOpenText}
            </PrimaryButton>
            <Dialog
                open={alertDialogOpen}
                onClose={handleAlertDialogClose}
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
                        onClickHandler={handleAlertDialogClose}
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