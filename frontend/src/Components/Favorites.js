import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AccountContext } from "./AccountContext";

const Favorites = () => {
  const { user } = useContext(AccountContext);
  const [usersFavorites, setUsersFavorites] = useState([]);

  // Fetch for current user data by id.
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
        setUsersFavorites(data.data.favorites);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFavs();
  }, []);

  if (!usersFavorites.length) {
    return (
      <>
        <FullWrap>
          <Empty>You have no favorites.</Empty>
        </FullWrap>
      </>
    );
  } else {
    return (
      <>
        <FullWrap>
          {usersFavorites.map((fav, index) => {
            return (
              <Favs key={index}>
                {fav.name} <Img src={fav.image} />
              </Favs>
            );
          })}
        </FullWrap>
      </>
    );
  }
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
  border-radius: 12px;
  box-shadow: 0 0 5px 0px #ff6700;
`;

const Empty = styled.div`
  margin-top: 50px;
`;

export default Favorites;
