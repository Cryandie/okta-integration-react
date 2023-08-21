import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

interface UserInfo {
  [key: string]: any;
}

interface Message {
  id: number;
  date: string;
  text: string;
}

const Profile: React.FC = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth, messages]); // Update if authState changes

  const callBackend = async () => {
    //FIXME: Add try catch blocks
    const response = await fetch("http://localhost:8080/api/locked", {
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
      },
    });

    if (!response.ok) {
      return Promise.reject();
    }

    const data = await response.json();
    setMessages(data.messages);
  };

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>
          Below is the information from your ID token which was obtained during
          the &nbsp;
          <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
            PKCE Flow
          </a>
          &nbsp; and is now stored in local storage.
        </p>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map(([claimName, claimValue]) => {
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={callBackend}>Call api</button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, index) => {
              return (
                <tr key={index} id={index.toString()}>
                  <td>{message.date}</td>
                  <td>{message.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
