import React, { FC } from "react";
import { Alert as MaterialAlert, AlertTitle } from "@material-ui/lab";
import {useStyles} from "../materialStyles";

type AlertProps = {
  title: string;
  children: string;
};

export const Alert: FC<AlertProps> = ({ title , children}) => {
  const classes = useStyles();
  return (
      <MaterialAlert severity="error" className = {classes.alert}>
      <AlertTitle> {title} </AlertTitle>
        {children}
    </MaterialAlert>
  );
};