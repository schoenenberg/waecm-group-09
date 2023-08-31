import Container from '@material-ui/core/Container';

import React, { FC } from 'react';
import { useStyles } from '../materialStyles';
import { MenuAppBar } from '../components/Navigation';

type DashboardProps = {
  interactionAllowed: string;
  setGuidelineAccepted: (newValue: boolean) => void;
  guidelineAccepted: boolean;
  logoutHandler: () => void;
};

export const Dashboard: FC<DashboardProps> = ({
  interactionAllowed,
  guidelineAccepted,
  setGuidelineAccepted,
  logoutHandler,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container}>
      <div className={interactionAllowed}>
        <header>
          <MenuAppBar
            onLogout={logoutHandler}
            guidelineAccepted={guidelineAccepted}
            setGuidelineAccepted={setGuidelineAccepted}
          />
        </header>
      </div>
    </Container>
  );
};
