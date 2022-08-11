import { useEffect, useState } from "react";
import styled from "styled-components";

const Modal = ({ open, onClose }) => {
  const [count, setCount] = useState(300);

  const [post, setPost] = useState("");

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
        console.log({ data });
        setUser(data.user);
        setUsersGames(data.body);
      } catch (err) {
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, [setUser]);

  // const handleComment = (e) => {
  //   e.preventDefault();
  //   fetch("", {
  //     method: "POST",
  //     body: JSON.stringify({ status: post }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).catch((e) => {
  //     set("Error");
  //   });
  //   fetch(``)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       set(data);
  //     })
  //     .catch((e) => {
  //       set("Error");
  //     });
  //   e.target.reset();
  //   setCount(300);
  // };

  // onSubmit={(e) => handleComment(e)}

  if (!open) return null;
  return (
    <>
      <div>Fancy Modal</div>
      <ImgTextBox>
        <UserDiv>
          <UserName>{user.displayName}</UserName>
          <Img src={user.photos[1].value} />
        </UserDiv>
        <Form>
          <TextInput
            placeholder={"Comment here..."}
            onChange={(e) => {
              setPost(e.target.value);
              setCount(300 - e.target.value.length);
            }}
          ></TextInput>
          <CountAndBtn>
            <TextCount
              style={{
                color:
                  count <= 0 ? "red" : count <= 120 ? "#ed9105" : "#5bccf6",
                visibility: count < 300 ? "unset" : "hidden",
                paddingRight: "8px",
              }}
            >
              {count}
            </TextCount>
            <CommentBtn disabled={count < 0 || count >= 300}>
              Comment
            </CommentBtn>
            <CloseBtn onClick={onClose}>Close</CloseBtn>
          </CountAndBtn>
        </Form>
      </ImgTextBox>
    </>
  );
};

const CountAndBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 0px;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Img = styled.img``;
const UserName = styled.div``;

const ImgTextBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #212120;
  padding: 50px;
  z-index: 10;
`;

const TextCount = styled.div`
  opacity: 0.3;
`;

const CloseBtn = styled.button`
  border-radius: 25px;
  margin-left: 12px;
  width: fit-content;
  height: 45px;
  font-size: large;
  border: none;
  background: none;
  font-weight: bold;
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

const CommentBtn = styled.button`
  border-radius: 25px;
  margin-left: 12px;
  width: fit-content;
  height: 45px;
  font-size: large;
  border: none;
  background: none;
  font-weight: bold;
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

const Form = styled.form`
  display: flex;
  flex-flow: column;
`;

const TextInput = styled.textarea`
  padding-left: 12px;
  width: 880px;
  height: 250px;
  resize: none;
  border: none;
  font-size: larger;
  padding-top: 25px;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

export default Modal;
