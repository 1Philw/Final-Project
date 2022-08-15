import { useParams } from "react-router-dom";

const { useContext, useState, useEffect } = require("react");
const { HomepageContext } = require("./HomepageContext");

const GameDetails = () => {
  const { games } = useContext(HomepageContext);
  const [details, setDetails] = useState(null);
  // const id = games.results.map((ids) => ids.id);
  // console.log(id);

  const { id } = useParams();

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=2e06ccaa17a44ac6bd7b391b815b90c1`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log({ data });
        setDetails(data);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, []);

  return (
    <>
      gamesdetail
      <div></div>
    </>
  );
};

export default GameDetails;
