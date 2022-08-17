import Image from "../Images/infinity-symbol.png";
import styled, { keyframes } from "styled-components";

// Logo used as our loading state image.
const Logo = () => {
  return (
    <>
      <ImageWrapper>
        <Img src={Image} />
      </ImageWrapper>
    </>
  );
};

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15%;
`;

const Spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}`;

const Img = styled.img`
  height: 120px;
  animation: ${Spin} 900ms linear infinite;
`;

export default Logo;
