import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => {
    try {
      await oktaAuth.signInWithRedirect({ originalUri: "/profile" });
    } catch (e) {
      console.error(e); //Temporary error handling, we can customize this later to fit our needs.
    }
  };
  const handleLogout = async () => {
    // oktaAuth.signOut() doesn't work
    try {
      await oktaAuth.revokeAccessToken();
      await oktaAuth.revokeRefreshToken();
      oktaAuth.tokenManager.clear();
    } catch (e) {
      console.error(e); //Temporary error handling, we can customize this later to fit our needs.
      return;
    }
  };

  if (!authState) {
    return <h2>Loading authentication...</h2>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <button onClick={login}>Sign in</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>You're authenticated!</h2>
        <button onClick={handleLogout}>Sign out</button>
      </div>
    );
  }
};
export default Home;
