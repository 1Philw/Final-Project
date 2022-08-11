import styled from "styled-components";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = ({ user, usersGames = [] }) => {
  const nav = useNavigate();

  if (!user) {
    return (
      <>
        <Container>
          <Title onClick={() => nav("/")}>Welcome to Echelon Gaming</Title>
          <Wrapper>
            <Auth href="http://localhost:8000/auth/steam">
              <FaSignInAlt /> Sign-in
            </Auth>
          </Wrapper>
        </Container>
      </>
    );
  } else
    return (
      <>
        <Container>
          <Title onClick={() => nav("/")}>Welcome to Echelon Gaming</Title>
          <Wrapper>
            <Auth href="http://localhost:8000/logout">
              <FaSignOutAlt /> Sign-out
            </Auth>
            <SearchBar usersGames={usersGames} user={user} />
            <Button onClick={() => nav("/account")}>Profile</Button>
          </Wrapper>
        </Container>
      </>
    );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const Title = styled.h1`
  padding-top: 20px;
  cursor: pointer;
`;

const Auth = styled.a`
  display: flex;
  gap: 5px;
  text-decoration: none;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  position: relative;
  :after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-bottom: 1px solid #ff6700;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-in-out;
  }
  :hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  font-size: medium;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  position: relative;
  :after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-bottom: 1px solid #ff6700;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-in-out;
  }
  :hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Container = styled.div`
  background-color: #212120;
`;

export default Header;
