import styled from "styled-components";
import colorful from "../../src/Images/colorful-dark.jpg";

const Background = () => {
  return <Image />;
};

const Image = styled.div`
  background-image: url(${colorful});
  background-size: cover;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

export default Background;
