import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Guidelines } from '../components/Guidelines';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React, { FC } from 'react';
import { useStyles } from '../materialStyles';

type PolicyProps = {
  guidelineAccepted: boolean;
  setGuidelineAccepted: (newValue: boolean) => void;
};

export const Policy: FC<PolicyProps> = ({
  guidelineAccepted,
  setGuidelineAccepted,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container}>
      <div className={classes.flexCentering}>
        <header>
          <div>
            <h1 className={classes.fonts}>Datenschutz-Richtlinien</h1>
            <Divider variant="middle" />
          </div>
        </header>
        <Guidelines
          guidelineAccepted={guidelineAccepted}
          setGuidelineAccepted={setGuidelineAccepted}
        />
        <Link to="/">
          <Button
            variant="contained"
            className={classes.backButton}
            onClick={() => {}}
          >
            {'Back'}
          </Button>
        </Link>
      </div>
    </Container>
  );
};
