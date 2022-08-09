import { GiRollingBomb } from "react-icons/gi";
import styled from "styled-components";
const Error = () => {
  return (
    <Wrapper>
      <Bomb>
        <GiRollingBomb style={{ height: `60px`, width: `60px` }} />
      </Bomb>
      <Errormsg>An uknown error has occured.</Errormsg>
      <Supportmsg>
        Please try refreshing the page, or <Em>contact support</Em> if the
        problem persists.
      </Supportmsg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 120px;
`;

const Bomb = styled.div`
  display: flex;
  justify-content: center;
`;

const Errormsg = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const Supportmsg = styled.div`
  width: 440px;
  margin: auto;
  font-size: larger;
`;

const Em = styled.em`
  cursor: pointer;
`;

export default Error;
