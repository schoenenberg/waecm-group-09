import Button from "@material-ui/core/Button";
import React, { FC, MouseEventHandler } from "react";
import { useStyles } from "../materialStyles";

type PrimaryButtonProps = {
  onClickHandler: MouseEventHandler;
  children: string;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClickHandler,
  children
}) => {
  const classes = useStyles();

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={onClickHandler}
    >
      {children}
    </Button>
  );
};
