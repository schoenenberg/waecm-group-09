import Button from "@material-ui/core/Button";
import React, { FC, MouseEventHandler } from "react";
import { useStyles } from "../materialStyles";

type PrimaryButtonProps = {
  onClickHandler: MouseEventHandler;
  disabled?: boolean
  children: string;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClickHandler,
  disabled = false,
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
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
