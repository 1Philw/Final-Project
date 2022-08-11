import { useContext } from "react";
import { HomepageContext } from "./HomepageContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageTwo from "./PageTwo";
import FeedIcons from "./FeedIcons";

const Feed = () => {
  const { feed, setFeed, games, setGames } = useContext(HomepageContext);

  let nav = useNavigate();

  // console.log(games);

  return (
    <>
      <FullWrap>
        <Wrapper>
          <Container>
            <Platforms>PC</Platforms>
            <Platforms>Playstation 5</Platforms>
            <Platforms>Xbox Series X/S</Platforms>
            <Platforms>Playstation 4</Platforms>
            <Platforms>Xbox One</Platforms>
          </Container>
        </Wrapper>
        <GeneralInfo>
          <Title>Some of todays top games!</Title>
        </GeneralInfo>
        <GamesWrapper>
          <Gamelists>
            {games.results.map((x) => {
              // console.log(x);
              return (
                <Result>
                  {x.name} <Img src={x.background_image} />
                  <FeedIcons />
                </Result>
              );
            })}
          </Gamelists>
        </GamesWrapper>
        <NextList>
          <Next>Next</Next>
        </NextList>
        <PageTwo />
      </FullWrap>
    </>
  );
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

const FullWrap = styled.div`
  background-color: #212120;
`;

const RatingTitle = styled.div``;

export default Feed;
