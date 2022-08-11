import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Background from "./Background";

const Account = ({ user, usersGames }) => {
  let nav = useNavigate();

  if (!user || !usersGames) {
    return <>Loading</>;
  }

  console.log(user);
  console.log(usersGames);

  const handleSelect = (id) => {
    console.log(id);
    nav(`/game/${id}`);
  };

  return (
    <>
      <Background />
      <Wrapper>
        <TopWrapper>
          <div>Hello {user.displayName}</div>
          <div>
            <UserImg src={user.photos[1].value} />
          </div>
        </TopWrapper>
        <OwnedGames>Games owned {usersGames.game_count}</OwnedGames>
        <Container>
          {usersGames.games.map((game, index) => {
            return (
              <GameDiv key={index} onClick={() => handleSelect(game.appid)}>
                {game.name} - Hrs Played -{" "}
                {Math.floor(game.playtime_forever / 60)}
              </GameDiv>
            );
          })}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* background-color: #212120; */
  margin-left: 15px;
`;
const Container = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const TopWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const OwnedGames = styled.div`
  margin-top: 12px;
`;

const GameDiv = styled.div`
  border-bottom: 1px solid #5bccf6;
  border-radius: 8px;
  cursor: pointer;
  /* #ff6700 */
  /* #5bccf6 */
`;

const UserImg = styled.img``;

export default Account;
