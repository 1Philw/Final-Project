import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <Title>Welcome to Echelon Gaming</Title>
      <Wrapper>
        <Auth href="http://localhost:8000/auth/steam">
          <FaSignInAlt /> Sign in
        </Auth>
        <input></input>
        <Select>
          <Option>Genres</Option>
          <Option>Adventure</Option>
          <Option>Action</Option>
          <Option>Family</Option>
          <Option>Indie</Option>
          <Option>Massively Multiplayer</Option>
          <Option>Puzzle</Option>
          <Option>RPG</Option>
          <Option>Shooter</Option>
          <Option>Simulation</Option>
          <Option>Sports</Option>
          <Option>Strategy</Option>
        </Select>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const Select = styled.select``;

const Option = styled.option`
  background-color: #ff6700;
  color: black;
`;

const Title = styled.h1`
  margin-top: 12px;
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

export default Header;
