import { useContext } from "react";
import styled from "styled-components";
import { HomepageContext } from "./HomepageContext";

const GameListThree = () => {
  const { games } = useContext(HomepageContext);
  const gameList = games.results.map((game) => game.name);
  const gameImg = games.results.map((img) => img.background_image);
  return (
    <>
      <GamesWrapper>
        <Gamelists>
          <Result>
            {gameList[10]} <Img src={gameImg[10]} />
          </Result>
          <Result>
            {gameList[11]} <Img src={gameImg[11]} />
          </Result>
          <Result>
            {gameList[12]} <Img src={gameImg[12]} />
          </Result>
          <Result>
            {gameList[13]} <Img src={gameImg[13]} />
          </Result>
          <Result>
            {gameList[14]} <Img src={gameImg[14]} />
          </Result>
        </Gamelists>
      </GamesWrapper>
      <GamesWrapper2>
        <Gamelists2>
          <Result>
            {gameList[15]} <Img src={gameImg[15]} />
          </Result>
          <Result>
            {gameList[16]} <Img src={gameImg[16]} />
          </Result>
          <Result>
            {gameList[17]} <Img src={gameImg[17]} />
          </Result>
          <Result>
            {gameList[18]} <Img src={gameImg[18]} />
          </Result>
          <Result>
            {gameList[19]} <Img src={gameImg[19]} />
          </Result>
        </Gamelists2>
      </GamesWrapper2>
    </>
  );
};

const Img = styled.img`
  width: 250px;
  height: 250px;
`;

const Gamelists = styled.div`
  display: flex;
  margin-top: 25px;
  gap: 20px;
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

export default GameListThree;
