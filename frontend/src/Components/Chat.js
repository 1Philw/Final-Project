import styled from "styled-components";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBqXX_Vs8E1D6PW9vfF5B-xy4n1o9MzdVc",
  authDomain: "final-project-dfe49.firebaseapp.com",
  projectId: "final-project-dfe49",
  storageBucket: "final-project-dfe49.appspot.com",
  messagingSenderId: "809572530335",
  appId: "1:809572530335:web:d02fbcfa6f6b66051bcaaa",
  measurementId: "G-BMCR4Q04BN",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const Chat = () => {
  return (
    <>
      CHAT!
      <MessageContainer></MessageContainer>
      <Form>
        <Message type="text"></Message>
        <Submit type="submit">Send</Submit>
      </Form>
    </>
  );
};

const MessageContainer = styled.div``;

const Form = styled.form``;

const Message = styled.input``;

const Submit = styled.button``;
export default Chat;
