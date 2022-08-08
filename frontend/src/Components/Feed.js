import { useContext } from "react";
import { HomepageContext } from "./HomepageContext";
import styled from "styled-components";

const Feed = () => {
  const { feed, setFeed, games, setGames } = useContext(HomepageContext);

  const imgs = feed.results.map((img) => {
    return img.image_background;
  });

  const genres = games.results.map((genre) => genre.genres);

  // console.log(imgs);
  console.log(feed.results);
  console.log(genres);
  // {imgs.map((image) => {
  //   return <img src={image} />;
  // })}

  return (
    <>
      <Wrapper>
        {feed.results.slice(0, 6).map((plateform, index) => {
          return (
            <div key={index}>
              <Plateforms>{plateform.name}</Plateforms>
              {feed.results.map((games) => {
                if (games.name === plateform.name) {
                  return games.games.map((game, index) => {
                    return <div key={index}>{game.name}</div>;
                  });
                }
              })}
            </div>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
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

export default Feed;
