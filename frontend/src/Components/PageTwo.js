import { useEffect, useState } from "react";
import Error from "./Error";

const PageTwo = () => {
  const [gamesTwo, setGamesTwo] = useState(null);
  const [load, setLoad] = useState("Loading");
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?dates=2019-09-01%2C2022&key=2e06ccaa17a44ac6bd7b391b815b90c1&page=2"
        );
        const pageTwo = await res.json();
        console.log(pageTwo);
        setGamesTwo(pageTwo);
        setLoad("Idle");
      } catch (err) {
        setLoad("Error");
      }
    };
    fetchFunc();
  }, []);

  if (load === "Error") {
    return <Error />;
  }

  if (gamesTwo === null) {
    return <>Loading</>;
  }

  return <></>;
};

export default PageTwo;
