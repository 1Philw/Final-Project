import { useContext } from "react";
import { HomepageContext } from "./HomepageContext";
import styled from "styled-components";
import GameListThree from "./GameListThree";
import BackgroundTwo from "./BackgroundTwo";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { feed, setFeed, games, setGames } = useContext(HomepageContext);

  let nav = useNavigate();

  const gameList = games.results.map((game) => game.name);
  const gameImg = games.results.map((img) => img.background_image);
  // console.log(games);
  // const next = games.next;
  // console.log(next);
  return (
    <>
      <Wrapper>
        <Container>
          <Plateforms>PC</Plateforms>
          <Plateforms>Playstation 5</Plateforms>
          <Plateforms>Xbox Series X/S</Plateforms>
          <Plateforms>Playstation 4</Plateforms>
          <Plateforms>Xbox One</Plateforms>
        </Container>
      </Wrapper>
      <GeneralInfo>
        <Title>Some of todays top games!</Title>
      </GeneralInfo>
      <GamesWrapper>
        <Gamelists>
          <Result>
            {gameList[0]} <Img src={gameImg[0]} />
          </Result>
          <Result>
            {gameList[1]} <Img src={gameImg[1]} />
          </Result>
          <Result>
            {gameList[2]} <Img src={gameImg[2]} />
          </Result>
          <Result>
            {gameList[3]} <Img src={gameImg[3]} />
          </Result>
          <Result>
            {gameList[4]} <Img src={gameImg[4]} />
          </Result>
        </Gamelists>
      </GamesWrapper>
      <GamesWrapper2>
        <Gamelists2>
          <Result>
            {gameList[5]} <Img src={gameImg[5]} />
          </Result>
          <Result>
            {gameList[6]} <Img src={gameImg[6]} />
          </Result>
          <Result>
            {gameList[7]} <Img src={gameImg[7]} />
          </Result>
          <Result>
            {gameList[8]} <Img src={gameImg[8]} />
          </Result>
          <Result>
            {gameList[9]} <Img src={gameImg[9]} />
          </Result>
        </Gamelists2>
      </GamesWrapper2>
      <BackgroundTwo />
      <GameListThree />
      <NextList>
        <Next>Next</Next>
      </NextList>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Plateforms = styled.button`
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
`;

const Gamelists = styled.div`
  display: flex;
  /* flex-flow: column; */
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
  gap: 5px;
`;

const GamesWrapper2 = styled.div`
  display: flex;
  justify-content: center;
`;

const Gamelists2 = styled.div`
  display: flex;
  margin-top: 25px;
  gap: 20px;
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

export default Feed;
