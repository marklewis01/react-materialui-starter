import React from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  TextField,
  Typography,
  withMobileDialog
} from "@material-ui/core";

import * as routes from "../../routes";
import * as auth from "../../helpers/auth";
import * as firestore from "../../helpers/firestore.js";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
const useStyles = makeStyles(styles);

const INITIAL_STATE = {
  email: "demo@demo.com",
  error: null,
  familyName: "",
  givenName: "",
  password: "letmeinplease",
  option: "login"
};

export default function LoginModal({ closeLogin, loginModal, toggleModal }) {
  const classes = useStyles();
  const history = useHistory();

  const [errors, setErrors] = React.useState(null);
  const [form, setForm] = React.useState(INITIAL_STATE);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onCloseModal = () => {
    closeLogin();
    setForm(INITIAL_STATE);
  };

  const changeComponent = obj => {
    setForm(prevState => {
      return {
        ...prevState,
        option: obj.value
      };
    });
  };

  const updateByPropertyName = obj => {
    const { key } = obj;
    setForm(prevState => {
      return {
        ...prevState,
        [key]: obj.value
      };
    });
  };

  // componentWillUnmount() {
  //   // clearTimeout(this.timer)
  // }

  const handleLogin = event => {
    event.preventDefault();

    if (!loading && form.email === "demo@demo.com") {
      setLoading(true);

      auth
        .doAnonymousSignIn()
        .then(() => {
          setSuccess(true);
          history.push(routes.DASHBOARD);
          closeLogin();
        })
        .catch(error => {
          setErrors(error);
        });
    } else {
      // user has changed email address. login email address
      setLoading(true);
      auth
        .doSignInWithEmailAndPassword(form.email, form.password)
        .then(() => {
          this.timer = setTimeout(() => {
            setSuccess(true);
          }, 1000);
          history.push(routes.DASHBOARD);
          closeLogin();
        })
        .catch(error => {
          setErrors(error);
        });
    }
  };

  const handleReset = event => {
    const { email } = this.state;

    if (!this.state.loading) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            loading: true
          };
        },
        () => {
          auth
            .doPasswordReset(email)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
            })
            .catch(error => {
              this.setState(prevState => {
                return {
                  ...prevState,
                  error
                };
              });
            });
        }
      );
    }
    event.preventDefault();
  };

  const handleRegister = event => {
    const { email, familyName, givenName, password } = this.state;
    const { history } = this.props;

    if (!this.state.loading) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            loading: true
          };
        },
        () => {
          auth
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
              // Create a user in your own accessible Firebase Database too
              firestore
                .doCreateUser(authUser.user.uid, familyName, givenName, email)
                .then(() => {
                  this.setState(() => ({ ...INITIAL_STATE }));
                  history.push(routes.DASHBOARD);
                })
                .catch(error => {
                  this.setState(prevState => {
                    return {
                      ...prevState,
                      error
                    };
                  });
                });
            })
            .catch(error => {
              this.setState(prevState => {
                return {
                  ...prevState,
                  error
                };
              });
            });
        }
      );
    }
    event.preventDefault();
  };

  const screen = {
    login: {
      title: "Log in to your account",
      altLink: "Forgot your password",
      altLinkTarget: "reset",
      buttonText: "Login",
      fields: [
        {
          id: "email",
          label: "Email Address",
          type: "email",
          autoFocus: true,
          autoComplete: "email",
          value: form.email
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          autoComplete: "current-password",
          value: form.password
        }
      ],
      isValid: form.password === "" || form.email === "" || loading,
      onSubmit: handleLogin
    },
    reset: {
      title: "Reset your password",
      altLink: "Remembered it? Go back to login?",
      altLinkTarget: "login",
      buttonText: "Reset",
      fields: [
        {
          id: "email",
          autoFocus: true,
          label: "Email Address",
          type: "email",
          autoComplete: "email",
          value: form.email
        }
      ],
      isValid: form.email === "" || loading,
      onSubmit: handleReset
    },
    register: {
      title: "Register for a New Account",
      altLink: "",
      buttonText: "Register",
      fields: [
        {
          id: "givenName",
          label: "First Name",
          type: "text",
          autoFocus: true,
          autoComplete: "given-name",
          value: form.givenName
        },
        {
          id: "familyName",
          label: "Surname",
          type: "text",
          autoComplete: "family-name",
          value: form.familyName
        },
        {
          id: "email",
          label: "Email Address",
          type: "email",
          autoComplete: "email",
          value: form.email
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          autoComplete: "current-password",
          value: form.password
        }
      ],
      isValid:
        form.givenName === "" ||
        form.familyName === "" ||
        form.email === "" ||
        form.password === "" ||
        loading,
      onSubmit: handleRegister
    }
  };

  return (
    <Dialog
      open={loginModal}
      onBackdropClick={onCloseModal}
      transitionDuration={100}
      classes={{ paper: classes.paper }}
    >
      <DialogContent>
        <Typography align="center" variant="h5">
          {screen[form.option].title}
        </Typography>
        <form onSubmit={screen[form.option].onSubmit}>
          {screen[form.option].fields.map(field => {
            return (
              <TextField
                key={field.id}
                autoFocus={field.autoFocus}
                fullWidth
                margin="dense"
                id={field.id}
                label={field.label}
                type={field.type}
                autoComplete={field.autoComplete}
                value={field.value}
                disabled={loading}
                onChange={event => {
                  updateByPropertyName({
                    key: field.id,
                    value: event.target.value
                  });
                }}
              />
            );
          })}
          <Typography align="right">
            <Button
              disabled={loading}
              disableFocusRipple={true}
              disableRipple={true}
              size="small"
              color="primary"
              onClick={() =>
                changeComponent({
                  value: screen[form.option].altLinkTarget
                })
              }
            >
              {screen[form.option].altLink}
            </Button>
          </Typography>

          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.buttonSuccess}
            disabled={screen[form.option].isValid}
            type="submit"
            onClick={screen[form.option].onSubmit}
          >
            {screen[form.option].buttonText}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </form>

        <Divider />
        {form.option !== "register" ? (
          <div className={classes.register}>
            <Typography align="center" paragraph={true} variant="body1">
              Don't have an account?
            </Typography>
            <Button
              fullWidth={true}
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() =>
                changeComponent({
                  value: "register"
                })
              }
            >
              Create a Trial Account
            </Button>
          </div>
        ) : (
          <div className={classes.register}>
            <Typography align="center">
              <Button
                disabled={loading}
                disableFocusRipple={true}
                disableRipple={true}
                size="small"
                color="primary"
                onClick={() =>
                  changeComponent({
                    value: "login"
                  })
                }
              >
                Go back to login
              </Button>
            </Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// const LoginModalWithRouter = withRouter(LoginModal);

// const StyledModal = withStyles(styles, { withTheme: true })(
//   LoginModalWithRouter
// );

// export default withMobileDialog()(StyledModal);
