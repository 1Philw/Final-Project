import { useContext, useEffect, useState } from "react";
import { HomepageContext } from "./HomepageContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FeedIcons from "./FeedIcons";

const Feed = () => {
  const { feed, setFeed, games, setGames } = useContext(HomepageContext);
  // const [details, setDetails] = useState(null);

  let nav = useNavigate();

  // Fetching instead of using Context due to backend/error.
  const [user, setUser] = useState(null);
  const [usersGames, setUsersGames] = useState({});
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
        // console.log({ data });
        setUser(data.user);
        setUsersGames(data.body);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, [setUser]);

  // const id = games.results.map((ids) => ids.id)
  // console.log(id)

  // const handleGameDetails = async () => {
  //   try {
  //     const res = await fetch(
  //       `https://api.rawg.io/api/games/${}?key=2e06ccaa17a44ac6bd7b391b815b90c1`,
  //       {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Credentials": true,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     console.log({ data });
  //     setDetails(data);
  //   } catch (err) {
  //     console.log(err.stack, err.message);
  //   }
  // };

  if (!user) {
    return (
      <>
        <FullWrap>
          <Wrapper>
            <Container>
              <Platforms onClick={() => nav("/pc")}>PC</Platforms>
              <Platforms onClick={() => nav("/psfive")}>
                Playstation 5
              </Platforms>
              <Platforms onClick={() => nav("/xboxseries")}>
                Xbox Series X/S
              </Platforms>
              <Platforms onClick={() => nav("/psfour")}>
                Playstation 4
              </Platforms>
              <Platforms onClick={() => nav("/xboxone")}>Xbox One</Platforms>
            </Container>
          </Wrapper>
          <GeneralInfo>
            <Title>Some of todays top games!</Title>
          </GeneralInfo>
          <GamesWrapper>
            <Gamelists>
              {games.results.map((game, index) => {
                // console.log(game);
                return (
                  <Result key={index}>
                    {game.name}
                    <Img src={game.background_image} />
                  </Result>
                );
              })}
            </Gamelists>
          </GamesWrapper>
          <NextList>
            <Next onClick={() => nav("/pagetwo")}>Next</Next>
          </NextList>
        </FullWrap>
      </>
    );
  } else {
    return (
      <>
        <FullWrap>
          <Wrapper>
            <Container>
              <Platforms onClick={() => nav("/pc")}>PC</Platforms>
              <Platforms onClick={() => nav("/psfive")}>
                Playstation 5
              </Platforms>
              <Platforms onClick={() => nav("/xboxseries")}>
                Xbox Series X/S
              </Platforms>
              <Platforms onClick={() => nav("/psfour")}>
                Playstation 4
              </Platforms>
              <Platforms onClick={() => nav("/xboxone")}>Xbox One</Platforms>
            </Container>
          </Wrapper>
          <GeneralInfo>
            <Title>Some of todays top games!</Title>
          </GeneralInfo>
          <GamesWrapper>
            <Gamelists>
              {games.results.map((game, index) => {
                // console.log(game);
                return (
                  <Result key={index}>
                    {game.name} <Img src={game.background_image} />
                    <FeedIcons
                      gameName={game.name}
                      gameImg={game.background_image}
                    />
                  </Result>
                );
              })}
            </Gamelists>
          </GamesWrapper>
          <NextList>
            <Next onClick={() => nav("/pagetwo")}>Next</Next>
          </NextList>
        </FullWrap>
      </>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Platforms = styled.button`
  background-color: #ff6700;
  font-weight: bold;
  color: black;
  padding: 5px;
  margin: 8px;
  position: relative;
  z-index: 1;
  border: none;
  cursor: pointer;
  :after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #5bccf6;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-in;
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  position: relative;
  transition: transform 0.2s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Gamelists = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const GeneralInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 60px;
`;

const GamesWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Result = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  gap: 16px;
`;

const Title = styled.div`
  font-size: larger;
`;

const Next = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  font-size: medium;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  position: relative;
  :after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-bottom: 1px solid #ff6700;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-in-out;
  }
  :hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const NextList = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Container = styled.div``;

const FullWrap = styled.div`
  background-color: #141414;
`;

export default Feed;
