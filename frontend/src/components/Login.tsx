import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Alert } from "./Alert";
import { PrimaryButton } from "./PrimaryButton";
import React, { MouseEventHandler, FC } from "react";
import { useStyles } from "../materialStyles";
import { UserInformation } from "./UserInformation";

type LoginProps = {
  accessDenied: boolean;
  onLogin: MouseEventHandler;
  onLogout: MouseEventHandler;
  onRedirectStartpage: MouseEventHandler;
  isProfileDetailPage: boolean;
};

export const Login: FC<LoginProps> = ({
  accessDenied,
  onLogin,
  onLogout,
  onRedirectStartpage,
  isProfileDetailPage
}) => {
  const classes = useStyles();

  const materialClass = accessDenied
    ? classes.access_denied
    : isProfileDetailPage
    ? classes.profile_details
    : classes.login;

  const onClick = accessDenied
    ? onRedirectStartpage
    : isProfileDetailPage
    ? onLogout
    : onLogin;

  const buttonText = accessDenied
    ? "Redirect to Startpage"
    : isProfileDetailPage
    ? "Logout"
    : "Login";

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={materialClass}>
        {accessDenied && (
          <Alert title={"Error"}>Unfortunately the access was denied!</Alert>
        )}
        {isProfileDetailPage && !accessDenied && <UserInformation />}
        <PrimaryButton onClickHandler={onClick}>{buttonText}</PrimaryButton>
      </div>
    </Container>
  );
};
