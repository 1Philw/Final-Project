import { useEffect, useState } from "react";
import styled from "styled-components";

const Account = () => {
  const [user, setUser] = useState({});
  const [usersGames, setUsersGames] = useState({});

  useEffect(() => {
    const fetchFunc = async () => {
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
      console.log({ data });
      setUser(data.user);
      setUsersGames(data.body);
    };
    fetchFunc();
  }, [setUser]);

  if (!user.displayName) {
    return (
      <>
        <h2>Echelon Gaming</h2>
      </>
    );
  }

  const games = usersGames.games.map((result) => result.name);
  console.log(games);
  return (
    <>
      <Wrapper>
        <TopWrapper>
          <div>Hello {user.displayName}</div>
          <div>
            <UserImg src="https://avatars.akamai.steamstatic.com/b292b269db62d7eed53bbcd8c59f7d1645735a80_medium.jpg" />
          </div>
        </TopWrapper>
        <OwnedGames>Games owned {usersGames.game_count}</OwnedGames>
        <Games>{games}</Games>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 15px;
`;

const TopWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const OwnedGames = styled.div`
  margin-top: 12px;
`;

const UserImg = styled.img``;

const Games = styled.div`
  padding: 12px;
`;

export default Account;
