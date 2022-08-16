import { useContext, useEffect, useState } from "react";
import Error from "./Error";
import FeedIcons from "./FeedIcons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Logo from "./Logo";

const client_key = process.env.REACT_APP_KEY;

const PageTwo = () => {
  const { user } = useContext(AccountContext);
  const [gamesTwo, setGamesTwo] = useState(null);
  const [load, setLoad] = useState("Loading");
  let nav = useNavigate();

  // Fetch for page two of games from api.
  useEffect(() => {
    const fetchFuncTwo = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?dates=2019-09-01%2C2022&key=${client_key}&page=2`
        );
        const pageTwo = await res.json();
        setGamesTwo(pageTwo);
        setLoad("Idle");
      } catch (err) {
        setLoad("Error");
      }
    };
    fetchFuncTwo();
  }, []);

  if (load === "Error") {
    return <Error />;
  }

  if (gamesTwo === null) {
    return (
      <>
        <Logo />
      </>
    );
  }

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
              {gamesTwo.results.map((games, index) => {
                return (
                  <Result key={index} to={`/gamedetails/${games.id}`}>
                    {games.name} <Img src={games.background_image} />
                  </Result>
                );
              })}
            </Gamelists>
          </GamesWrapper>
          <NextList>
            <Next onClick={() => nav("/pagethree")}>Next</Next>
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
              {gamesTwo.results.map((games, index) => {
                return (
                  <ResultWrapper key={index}>
                    <Result to={`/gamedetails/${games.id}`}>
                      {games.name} <Img src={games.background_image} />
                    </Result>
                    <FeedIcons
                      gameName={games.name}
                      gameImg={games.background_image}
                    />
                  </ResultWrapper>
                );
              })}
            </Gamelists>
          </GamesWrapper>
          <NextList>
            <Next onClick={() => nav("/pagethree")}>Next</Next>
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
  border-radius: 12px;
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

const ResultWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  gap: 16px;
`;

const Result = styled(NavLink)`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  gap: 16px;
  text-decoration: none;
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

export default PageTwo;
