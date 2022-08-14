import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4, v4 } from "uuid";

const Modal = ({ onClose, user, setUser }) => {
  const [count, setCount] = useState(300);

  const [post, setPost] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // console.log("Fetching comments");
    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.data);
      })
      .catch((err) => {
        console.log(err.stack, err.message);
      });
  }, [message]);

  //posting comments to our collection in mongodb.
  const handleComment = (e) => {
    e.preventDefault();
    fetch("/user", {
      method: "POST",
      body: JSON.stringify({
        comment: post,
        user: user.displayName,
        _id: v4(),
        steamid: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err.stack, err.message);
    });
    e.target.reset();
    setCount(300);
    window.alert("You Successfully Commented");
  };

  if (!message) {
    return <>Loading</>;
  }

  return (
    <>
      <ImgTextBox>
        <UserDiv>
          <UserName>{user.displayName}</UserName>
          <Img src={user.photos[1].value} />
        </UserDiv>
        <Form onSubmit={(e) => handleComment(e)}>
          <MessageInput
            placeholder={"Comment here..."}
            onChange={(e) => {
              setPost(e.target.value);
              setCount(300 - e.target.value.length);
            }}
          ></MessageInput>
          {message.map((msgs) => {
            return (
              <Comments key={msgs._id}>
                <CommentUser>{msgs.user}:</CommentUser>
                <Comment>{msgs.comment}</Comment>
              </Comments>
            );
          })}
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
  background-color: #141414;
  padding: 50px;
  z-index: 10;
`;

const Comments = styled.div`
  display: flex;
  width: fit-content;
  margin-left: 10px;
  margin-top: 25px;
`;

const Comment = styled.div`
  margin-left: 5px;
`;

const CommentUser = styled.div`
  border-bottom: 1px solid #ff6700;
  border-radius: 50%;
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

const MessageInput = styled.textarea`
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
