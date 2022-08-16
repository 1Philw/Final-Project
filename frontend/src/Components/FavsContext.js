import { createContext, useContext, useEffect, useState } from "react";
import { AccountContext } from "./AccountContext";

export const FavsContext = createContext();

export const FavsProvider = ({ children }) => {
  const { user } = useContext(AccountContext);
  const [favorites, setFavorites] = useState(null);

  //Fetch to get our current users favorites by id.
  const favoritesChanged = async () => {
    try {
      const result = await fetch(`/user/${user.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const resultData = await result.json();
      setFavorites(resultData.data.favorites);
    } catch (err) {
      console.log(err.stack, err.message);
    }
  };
  //Fetch to get our current user data by id.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const result = await fetch(`/user/${user.id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        const resultData = await result.json();
        setFavorites(resultData.data.favorites);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    if (user) {
      fetchFunc();
    }
  }, [user]);

  return (
    <FavsContext.Provider
      value={{
        favorites,
        setFavorites,
        favoritesChanged,
      }}
    >
      {children}
    </FavsContext.Provider>
  );
};
