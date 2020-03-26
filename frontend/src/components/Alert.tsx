
import React, { FC } from "react";
import { Alert as MaterialAlert, AlertTitle } from "@material-ui/lab";

type AlertProps = {
  title: string;
  children: string;
};

export const Alert: FC<AlertProps> = ({ title , children}) => {
  return (
    <MaterialAlert severity="error">
      <AlertTitle> {title} </AlertTitle>
        {children}
    </MaterialAlert>
  );
};
