import { useEffect, useState } from "react";
import styled from "styled-components";

const Favorites = ({ user, usersGames }) => {
  const [usersFavorites, setUsersFavorites] = useState(null);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await fetch(`/user/${user.id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        const data = await res.json();
        console.log(data);
        setUsersFavorites(data.data);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFavs();
  }, []);

  if (usersFavorites === null) {
    return <>Loading</>;
  }

  return (
    <>
      <FullWrap>
        {usersFavorites.favorites.map((fav) => {
          return (
            <Favs key={usersFavorites.id}>
              {fav.name} <Img src={fav.image} />
            </Favs>
          );
        })}
      </FullWrap>
    </>
  );
};

const FullWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #141414;
  height: 100vh;
  width: 100vw;
  gap: 20px;
`;

const Favs = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  gap: 16px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  position: relative;
  transition: transform 0.2s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default Favorites;
