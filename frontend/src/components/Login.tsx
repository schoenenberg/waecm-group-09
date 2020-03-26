import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Alert } from "./Alert";
import { PrimaryButton } from "./PrimaryButton";
import React, { MouseEventHandler, FC } from "react";
import { useStyles } from "../materialStyles";
import { UserInformation } from "./UserInformation";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "../gql/currentUserQuery";

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
  const { error, loading } = useQuery(GET_CURRENT_USER);

  const materialClass =
    accessDenied || error
      ? classes.access_denied
      : isProfileDetailPage
      ? classes.profile_details
      : classes.login;

  const onClick =
    accessDenied || error
      ? onRedirectStartpage
      : isProfileDetailPage
      ? onLogout
      : onLogin;

  const buttonText =
    accessDenied || error
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
        <PrimaryButton
          onClickHandler={onClick}
          disabled={isProfileDetailPage && loading}
        >
          {buttonText}
        </PrimaryButton>
      </div>
    </Container>
  );
};
