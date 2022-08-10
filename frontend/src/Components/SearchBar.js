import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBar = ({ usersGames, user }) => {
  const [value, setValue] = useState("");

  const nav = useNavigate();
  // console.log(user);

  const gamesmap = usersGames.games.map((result) => {
    return result;
  });

  const matchedGame = gamesmap.filter((games) => {
    return games.name.toLowerCase().includes(value.toLowerCase());
  });

  const id = gamesmap.map((ids) => {
    return ids.appid;
  });

  const handleSelect = (matchedGame) => {
    nav(matchedGame);
  };

  return (
    <>
      <Search
        type="search"
        placeholder="Search games here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSelect(e.target.value);
          }
        }}
      ></Search>

      <Ul style={value.length < 2 ? { display: "none" } : { display: "block" }}>
        {matchedGame.map((suggestion, index) => {
          return (
            <Li key={index} onClick={() => handleSelect(suggestion.name)}>
              <span>
                {suggestion.name.slice(
                  0,
                  suggestion.name.toLowerCase().indexOf(value.toLowerCase()) +
                    value.length
                )}
                <span>
                  {suggestion.name.slice(
                    suggestion.name.toLowerCase().indexOf(value.toLowerCase()) +
                      value.length
                  )}
                </span>
              </span>
            </Li>
          );
        })}
      </Ul>
    </>
  );
};

const Search = styled.input`
  width: 300px;
  color: black;
  :focus {
    outline-style: none;
  }
`;

const Ul = styled.ul`
  position: absolute;
  margin-top: 45px;
  z-index: 2;
  box-shadow: 0px 0px 20px -2px #ff6700;
`;

const Li = styled.li`
  padding: 5px;
  :hover {
    cursor: pointer;
    color: #5bccf6;
  }
`;

export default SearchBar;
