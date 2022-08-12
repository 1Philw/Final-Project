import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";
import styled from "styled-components";

const GameNews = () => {
  const [news, setNews] = useState(null);
  const [load, setLoad] = useState("Loading");

  const { id } = useParams();
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(`/game/:name/${id}`);
        const feed = await res.json();
        console.log(feed);
        setNews(feed.body);
        setLoad("Idle");
      } catch (err) {
        setLoad("Error");
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, []);

  if (load === "Error") {
    return <Error />;
  }
  if (news === null) {
    return <>Loading</>;
  }

  return (
    <>
      <Wrapper>
        <div>News</div>
        {news.map((appNews, index) => {
          console.log(appNews, "Heysss");
          return (
            <Container>
              <Title key={index}>{appNews.title}</Title>
              <Anchor href={appNews.url}>News Page</Anchor>
              <Contents>{appNews.contents}</Contents>
            </Container>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #141414;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.div`
  margin-bottom: 20px;
`;

const Anchor = styled.a``;

const Contents = styled.div`
  margin-bottom: 40px;
`;

export default GameNews;
