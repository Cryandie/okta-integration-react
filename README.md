# Description

This is a simple representation of how to integrate OKTA in a SPA.
We have 2 root folders:

- spa: This is the client logic (front-end code), here we are using React v18, react-router-dom v6, okta-react, and okta-auth-js.
  Please note that currently Okta doesn't support the react-router-dom v6: https://github.com/okta/okta-react/issues/178 
    - I had to work things around to make it work, but if we are using this implementation into a project with react-rourter-dom version prior to v6, we could change the App.tsx and Home.tsx to match the current Okta documentation. 
    Otherwise if the actual implementation doesn't meet the requirements of the project and we are using react-router-dom v6 we could use another routing library for that (as suggested in the Okta issue that is linked above).

      - Since this is just a sample app, customization could be added later, for now it's a basic UI, we just have a home page with a sign in button that will redirect us to the Okta sign in page. Once logged in we need to go back to home page and press login again (this could be avoided and improved in a real project, for now this is needed only for the first time), and we will be redirected to the profile page with our Okta account details.

      - The current endpoint that we are calling is api/locked, this is the secure endpoint, and the okta authentification will be checked (access token verification) before accessing it. There is also the api/free endpoint that could be accessed without the previous process. This could be used to give information access to all users but limit other type of information only to some type of users. 
      Currently, you can click on the Call api button to call the api/locked endpoint.

- webserver: This is the server logic (backend code), here we are using node with Typescript, express, dotenv, and nodemon.
This is straight forward, we just have the index.ts where we are defining our endpoints using express and starting the server, and we have the oktaAuthRequired.ts and oktaJwtVerifier.ts that are implemented to add a security check for the /api/locked endpoint.

# Configuration
- You need an Okta account, you can sign in/up here: https://developer.okta.com/login/
- Once logged in go to Applications and click on the Create App Integration button.
- You will need to create 2 apps, one for the client and one the server:

    - For the client App choose OIDC - OpenID Connect then select SPA.
    - For the server App choose API services.

- Create an env file for the client (in spa) and define 3 vars:
    - REACT_APP_CLIENT_ID (assign the value from the Okta SPA App)
    - REACT_APP_OKTA_DOMAIN (assign the value from the Okta App: top-right just below your email)
    - REACT_APP_PORT (define your app port, exp: 3000)

- Create an env file for the server (in webserver) and define 6 vars:

    - APP_PORT (define your server port, exp: 8080)
    - OKTA_DOMAIN (same as the client's one)
    - AUTH_SERVER_ID (default)
    - AUDIENCE (api://default)
    - CLIENT_ID (assign the value from the Okta API App)
    - CLIENT_SECRET assign the value from the Okta API App
# Conclusion
- Please keep in mind that, this is just an example of how to implement Okta in a React SPA, there are many things that we could add, customize and improve! 😊