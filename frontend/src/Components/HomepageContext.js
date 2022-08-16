import { createContext, useEffect, useState } from "react";
import Error from "./Error";
import Logo from "./Logo";

const client_key = process.env.REACT_APP_KEY;

export const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const [feed, setFeed] = useState(null);
  const [feedStatus, setFeedStatus] = useState("Loading");
  const [games, setGames] = useState(null);
  const [gamesStatus, setGamesStatus] = useState("Loading");
  // Fetch for getting data regarding all of my gaming plateforms from rawg api.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/platforms?key=${client_key}`
        );
        const data = await res.json();
        setFeed(data);
        setFeedStatus("Idle");
      } catch (err) {
        setFeedStatus("Error");
      }
    };
    fetchFunc();
  }, []);
  // Fetch for getting a list of all available games.
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${client_key}&dates=2019-09-01,2022`
        );
        const data = await res.json();
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
    return (
      <>
        <Logo />
      </>
    );
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
