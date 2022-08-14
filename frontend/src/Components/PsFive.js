import { useContext } from "react";
import { HomepageContext } from "./HomepageContext";
import styled from "styled-components";

const PsFive = () => {
  const { feed } = useContext(HomepageContext);

  const data = feed.results.filter((obj) => {
    return obj.name === "PlayStation 5";
  });
  console.log(data);
  return (
    <>
      <FullWrap>
        {data.map((platpc) => {
          return (
            <Container key={platpc.id}>
              <Platform>{platpc.name}</Platform>
              <Img src={platpc.image_background} />
              {platpc.games.map((names) => {
                return (
                  <GameDiv key={names.id}>
                    <Gname>{names.name}</Gname>
                  </GameDiv>
                );
              })}
            </Container>
          );
        })}
      </FullWrap>
    </>
  );
};

const FullWrap = styled.div`
  background-color: #141414;
  height: 100vh;
  width: 100vw;
`;

const Img = styled.img`
  width: 100vw;
  height: 60vh;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Platform = styled.div`
  margin: 25px 0px;
`;

const GameDiv = styled.div`
  margin-top: 25px;
`;

const Gname = styled.div`
  margin-left: 150px;
  width: 500px;
`;

export default PsFive;
