import React from "react";
import { Route, Routes } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import Home from "./Home";
import Locked from "./Locked";
import Profile from "./Profile";
import { oktaConfig } from "./lib/oktaConfig";

const CALLBACK_PATH = "/login/callback";
const REACT_APP_PORT = process.env.REACT_APP_PORT;

const oktaAuth = new OktaAuth(oktaConfig);

const App: React.FC = () => {
  const restoreOriginalUri = async (
    _oktaAuth: OktaAuth,
    originalUri: string | undefined
  ) => {
    //Not the best solution but history is no longer supported and useNavigate() can't be used here. This solution match our needs without downsides here.
    // TODO: Handle prod url
    window.location.replace(`http://localhost:${REACT_APP_PORT}${originalUri}`);
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={CALLBACK_PATH} element={<LoginCallback />} />
        {/* SecureRoute only works with react-router-dom v5, unsupported here we are in v6 */}
        <Route path="/locked" element={<Locked />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Security>
  );
};

export default App;
