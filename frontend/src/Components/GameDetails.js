import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

const client_key = process.env.REACT_APP_KEY;

const GameDetails = () => {
  const [details, setDetails] = useState(null);

  const { id } = useParams();

  // Fetch for details of games by the games id.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${client_key}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, []);

  if (details === null) {
    return (
      <>
        <Logo />
      </>
    );
  }

  return (
    <>
      <FullWrap>
        <GameDetail>
          <Container>
            <ImgWrapper>
              <Img src={details.background_image} />
              <Img src={details.background_image_additional} />
            </ImgWrapper>
            <GameName>{details.name}</GameName>
          </Container>
          <div> {details.description_raw}</div>
          <RatingsContainer>
            <Esrb>
              <div>Rating {details.rating}</div>
              {details.esrb_rating !== null ? (
                <div>Rated: {details.esrb_rating.name}</div>
              ) : (
                <div>No esrb rating.</div>
              )}
              <div>Released: {details.released}</div>
            </Esrb>
            {details.ratings.map((rated, index) => {
              return (
                <Ratings key={index}>
                  <Title>{rated.title}:</Title>
                  <Count>Count {rated.count}</Count>
                  <div>{rated.percent}%</div>
                </Ratings>
              );
            })}
          </RatingsContainer>
        </GameDetail>
        <Urls>
          <Anchor href={details.metacritic_url}>Metacritic Review</Anchor>
          <Anchor href={details.reddit_url}>Reddit Review</Anchor>
        </Urls>
        <GameSite>
          <Anchor href={details.website}>Buy/Download here!</Anchor>
        </GameSite>
      </FullWrap>
    </>
  );
};

const FullWrap = styled.div`
  background-color: #141414;
  height: 100vh;
  width: 100vw;
`;

const GameDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const Container = styled.div``;

const ImgWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 12px;
  box-shadow: 0 0 5px 0px #ff6700;
`;

const GameName = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Ratings = styled.div``;

const Title = styled.div`
  font-size: large;
  margin-bottom: 8px;
`;

const Count = styled.div`
  margin-bottom: 8px;
`;

const RatingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;

const Esrb = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
`;

const Urls = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

const GameSite = styled.div`
  display: flex;
  justify-content: center;
`;

const Anchor = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  text-decoration: none;
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

export default GameDetails;
