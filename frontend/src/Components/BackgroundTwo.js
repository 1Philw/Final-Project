import styled from "styled-components";
import colorful from "../../src/Images/colorful-dark-2.jpg";

const BackgroundTwo = () => {
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

export default BackgroundTwo;
