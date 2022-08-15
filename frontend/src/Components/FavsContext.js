import { createContext, useContext, useEffect, useState } from "react";
import { AccountContext } from "./AccountContext";

export const FavsContext = createContext();

export const FavsProvider = ({ children }) => {
  const { user } = useContext(AccountContext);
  const [favorites, setFavorites] = useState(null);

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
      console.log(resultData);
      setFavorites(resultData.data.favorites);
    } catch (err) {
      console.log(err.stack, err.message);
    }
  };

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
        console.log(resultData);
        setFavorites(resultData.data.favorites);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    if (user) {
      fetchFunc();
    }
  }, [user]);

  // if (!favorites) {
  //   return <>Loading</>;
  // }

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
