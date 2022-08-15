import { createContext, useEffect, useState } from "react";
import Error from "./Error";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersGames, setUsersGames] = useState({});
  const [userStatus, setUserStatus] = useState("");
  //Fetch for gathering all needed data regarding signed in user.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch("http://localhost:8000/account", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        const data = await res.json();
        console.log({ data });
        setUser(data.user);
        setUsersGames(data.body);
      } catch (err) {
        switch (err.name) {
          case `SyntaxError`:
            break;
          default:
            setUserStatus("Error");
        }
      }
    };
    fetchFunc();
  }, [setUser]);

  if (userStatus === "Error") {
    return <Error />;
  }

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        usersGames,
        setUsersGames,
        userStatus,
        setUserStatus,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
