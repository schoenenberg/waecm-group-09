import React, { FC } from "react";
import { Checkbox, FormControlLabel, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(19),
    display: "block",
    height: "100%"
  },
  link: {
    color: "#FFFFFF"
  }
}));

type GuidelineProps = {
  guidelineAccepted: boolean;
};

export const Guidelines: FC<GuidelineProps> = (
  {
    guidelineAccepted
  }
) => {
  const classes = useStyles();

  function handleChange() {

  }

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={guidelineAccepted}
              onChange={handleChange}
              name="guidelineCheckbox"
              color="primary"
            />
          }
          label="Datenschutz-Richtlinien akzeptiert"
        />
      </Paper>
    </div>
  );
};