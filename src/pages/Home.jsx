import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import Message from "../components/Message";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import FlipMove from "react-flip-move";
import { Send, InsertEmoticon, Close } from "@mui/icons-material";
import Picker from "emoji-picker-react";

const Home = () => {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [openEmoji, setOpenEmoji] = useState(false);

  const handleEmojiOpen = () => {
    setOpenEmoji(!openEmoji);
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
    setOpenEmoji(false);
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot?.docs?.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      username: user.displayName,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Container>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png"
        width={100}
        height={100}
      />
      <h1
        style={{
          marginBottom: "10px",
          padding: "0px 10px",
          textAlign: "center",
        }}
      >
        Facebook Messenger
      </h1>
      <Tooltip title="Click to logout" placement="right" arrow>
        <h2
          style={{
            marginTop: "0px",
            marginBottom: "30px",
            fontFamily: "monospace",
            cursor: "pointer",
          }}
          onClick={signOut}
        >
          Welcome {user.displayName}
        </h2>
      </Tooltip>
      <MessageContainer>
        <FlipMove>
          {messages.map((message) => (
            <Message
              message={message.data}
              username={user.displayName}
              key={message.id}
            />
          ))}
        </FlipMove>
      </MessageContainer>
      <Form onSubmit={sendMessage}>
        <FormContainer>
          {openEmoji && (
            <EmojiContainer>
              <Picker onEmojiClick={onEmojiClick} />
            </EmojiContainer>
          )}
          {!openEmoji ? (
            <InsertEmoticon
              onClick={handleEmojiOpen}
              style={{ margin: "auto", marginRight: "10px", cursor: "pointer" }}
            />
          ) : (
            <Close
              style={{ margin: "auto", marginRight: "10px", cursor: "pointer" }}
              onClick={handleEmojiOpen}
            />
          )}
          <input
            id="standard-basic"
            label="Enter a message..."
            variant="standard"
            value={input}
            color="primary"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder="Enter a message..."
            style={{
              fontSize: "14px",
              fontFamily: "poppins",
              flex: 1,
              border: "none",
              outline: "none",
              padding: "4px 10px",
              borderRadius: "10px",
              boxShadow: "0px 0px 50px #eee",
            }}
          />
          <IconButton
            type="submit"
            disabled={!input}
            color="primary"
            variant="outlined"
          >
            <Send />
          </IconButton>
        </FormContainer>
      </Form>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MessageContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  position: fixed;
  bottom: 0;
  padding: 20px;
  background-color: whitesmoke;
  width: 80vw;
  margin-bottom: 20px;
  z-index: 100;
`;

const FormContainer = styled.div`
  display: flex;
  position: relative;
`;

const Image = styled.img`
  margin-top: 20px;
  user-select: none;
`;

const EmojiContainer = styled.div`
  position: absolute;
  bottom: 50px;
`;
