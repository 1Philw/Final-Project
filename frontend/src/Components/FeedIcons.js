import { useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineStar, AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
import Modal from "./Modal";

const FeedIcons = ({ gameName, gameImg }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  // Fetching instead of using Context due to backend/error.
  const [user, setUser] = useState(null);
  const [usersGames, setUsersGames] = useState({});
  // Fetch for gathering all needed data regarding signed in user.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
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
        // console.log({ data });
        setUser(data.user);
        setUsersGames(data.body);
        setIsFavorited(
          data.user.favorites.some((favorite) => favorite.name === gameName)
        );
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, []);

  const handleFavs = async () => {
    try {
      if (!isFavorited) {
        await fetch(`/favorite/${user.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            name: gameName,
            image: gameImg,
          }),
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
      } else {
        await fetch(`/favorite/remove/${user.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            name: gameName,
            image: gameImg,
          }),
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
      }
    } catch (err) {
      console.log(err.stack, err.message);
    }
    setIsFavorited(!isFavorited);
  };

  const [isActive, setIsActive] = useState(false);

  const [isLikedByUser, setIsLikedByUser] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleLike = (e) => {
    setIsLikedByUser(!isLikedByUser);
    setIsActive((current) => !current);
  };

  const [chat, setChat] = useState();

  const [chatToggle, setChatToggle] = useState(false);

  const handleToggleChat = (e) => {
    setChatToggle(!chatToggle);
    setChat(chatToggle ? chat - 1 : chat + 1);
  };

  const handleToggleModal = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <IconsButton onClick={handleToggleChat}>
        <FiMessageCircle
          style={{
            height: `18px`,
            width: `18px`,
          }}
          color={chatToggle ? "#ff6700" : ""}
          onClick={handleToggleModal}
        />
        {isOpen && (
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            user={user}
            setUser={setUser}
          />
        )}
      </IconsButton>
      <IconsButton onClick={handleFavs}>
        <AiOutlineStar
          style={{ height: `18px`, width: `18px` }}
          color={isFavorited ? "rgb(23, 191, 99)" : ""}
        />
        {/* <Span>{!!favorite && favorite}</Span> */}
      </IconsButton>
      <IconsButton onClick={handleToggleLike}>
        <AiOutlineLike
          style={{
            height: `18px`,
            width: `18px`,
            fill: isActive ? "#5bccf6" : "",
          }}
          color={isLikedByUser ? "#ff6700" : ""}
        />
      </IconsButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Span = styled.span`
  position: absolute;
  right: -12px;
`;

const IconsButton = styled.div`
  display: flex;
  position: relative;
  gap: 8px;
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 20px;
`;

export default FeedIcons;
