import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {FC, MouseEventHandler} from "react";
import {PrimaryButton} from "./PrimaryButton";

type NavigationProps = {
    onLogout: MouseEventHandler;
    handleAlertDialogOpen: MouseEventHandler;
    handleAlertDialogClose: MouseEventHandler;
    open: boolean;
};

export const AlertDialog: FC<NavigationProps> =  ({onLogout, handleAlertDialogClose, open}) =>  {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleAlertDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton
                        onClickHandler={handleAlertDialogClose}
                    >
                        No
                    </PrimaryButton>
                    <PrimaryButton
                        onClickHandler={onLogout}
                    >
                        Yes
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </div>);
}