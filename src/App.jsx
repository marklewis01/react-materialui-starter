import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "unstated";

// MaterialUI
import CircularProgress from "@material-ui/core/CircularProgress";

// Components
import NavSide from "./components/NavSide";
import NavTop from "./components/NavTop";
import PrivateRoute from "./components/PrivateRoute";
import LoginModal from "./components/Login";
import { AuthWrapper, FlexCentered } from "./components/Wrappers";

// auth + sessions
import { firebaseAuth } from "./firebase";
import SessionContainer from "./containers/session";

// Screens
import LandingPage from "./screens/LandingPage";
import AccountPage from "./screens/AccountPage";
import ComponentsPage from "./screens/ComponentsPage";
import Dashboard from "./screens/Dashboard";

// styles
import "./styles.css";

export default function App() {
  const [auth, setAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loginModal, setLoginModal] = React.useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
  };

  const closeLoginModal = () => {
    setLoginModal(false);
  };

  React.useEffect(() => {
    const firebaseListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        SessionContainer.signInUser(user).then(() => {
          // example only - value not used in this template
          setAuth(true);
        });
      } else {
        setAuth(false);
      }
      setLoading(false);
    });

    return () => firebaseListener();
  }, []);

  return loading === true ? (
    <FlexCentered>
      <CircularProgress color="secondary" />
    </FlexCentered>
  ) : (
    <Router>
      <Provider>
        <NavTop toggleModal={toggleLoginModal} />
        <NavSide />

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute path="/account" component={AccountPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/components" component={ComponentsPage} />
          <Route
            render={() => (
              <AuthWrapper>
                <h3>Something went wrong</h3>
              </AuthWrapper>
            )}
          />
        </Switch>
        <LoginModal
          loginModal={loginModal}
          toggleLogin={toggleLoginModal}
          closeLogin={closeLoginModal}
        />
      </Provider>
    </Router>
  );
}
