import { createContext, useEffect, useState } from "react";
import Error from "./Error";

export const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const [feed, setFeed] = useState(null);
  const [feedStatus, setFeedStatus] = useState("Loading");
  const [games, setGames] = useState(null);
  const [gamesStatus, setGamesStatus] = useState("Loading");
  // Fetch for getting data regarding all of my gaming plateforms.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/platforms?key=2e06ccaa17a44ac6bd7b391b815b90c1"
        );
        const data = await res.json();
        // console.log(data);
        setFeed(data);
        setFeedStatus("Idle");
      } catch (err) {
        setFeedStatus("Error");
      }
    };
    fetchFunc();
  }, []);
  // Fetch for getting a list of all my available games.
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=2e06ccaa17a44ac6bd7b391b815b90c1&dates=2019-09-01,2022"
        );
        const data = await res.json();
        // console.log(data);
        setGames(data);
        setGamesStatus("Idle");
      } catch (err) {
        setGamesStatus("Error");
      }
    };
    fetchGames();
  }, []);

  if (feedStatus === "Error" || gamesStatus === "Error") {
    return <Error />;
  }

  if (feed === null || games === null) {
    return <>Loading</>;
  }

  return (
    <HomepageContext.Provider
      value={{
        feed,
        setFeed,
        feedStatus,
        setFeedStatus,
        games,
        setGames,
        gamesStatus,
        setGamesStatus,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};
