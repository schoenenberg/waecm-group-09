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
  setGuidelineAccepted: (newValue: boolean) => void;
};

export const Guidelines: FC<GuidelineProps> = (
  {
    guidelineAccepted,
    setGuidelineAccepted
  }
) => {
  const classes = useStyles();

  function handleCheckboxChange(this: any, event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Handle Checkbox change", event.target.checked);
    setGuidelineAccepted(event.target.checked);
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={guidelineAccepted}
              onChange={handleCheckboxChange}
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