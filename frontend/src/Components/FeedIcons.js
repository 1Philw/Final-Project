import { useCallback, useContext, useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineStar, AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
import Modal from "./Modal";
import { AccountContext } from "./AccountContext";
import { FavsContext } from "./FavsContext";

const FeedIcons = ({ gameName, gameImg }) => {
  const { user, setUser } = useContext(AccountContext);
  const { favorites, favoritesChanged } = useContext(FavsContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsFavorited(favorites.some((favorite) => favorite.name === gameName));
    }
  }, [favorites]);

  //Handler for favoriting a game/adding it to favorites and removing it from favorites.
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
    favoritesChanged();
  };

  // Handler for liking a game and unliking it.
  const handleLikes = async () => {
    try {
      if (!isLiked) {
        await fetch(`/like/${user.id}`, {
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
        await fetch(`/like/remove/${user.id}`, {
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
    setIsLiked(!isLiked);
  };

  const [isOpen, setIsOpen] = useState(false);

  const [chatToggle, setChatToggle] = useState(false);

  //Handler for toggling Chat icon color on and off.
  const handleToggleChat = (e) => {
    setChatToggle(!chatToggle);
  };

  //Handler for toggling Modal open and close.
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
      </IconsButton>
      <IconsButton onClick={handleLikes}>
        <AiOutlineLike
          style={{
            height: `18px`,
            width: `18px`,
          }}
          color={isLiked ? "#5bccf6" : ""}
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
