import { createContext, useEffect, useState } from "react";

export const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const [feed, setFeed] = useState(null);
  const [feedStatus, setFeedStatus] = useState("Loading");
  const [games, setGames] = useState(null);
  const [gamesStatus, setGamesStatus] = useState("Loading");

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=2e06ccaa17a44ac6bd7b391b815b90c1&dates=2019-09-01,2019-09-30&platforms=18,1,7"
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
    return <>Error please try again.</>;
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
