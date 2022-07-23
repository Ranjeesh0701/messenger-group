import { Card, CardContent, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import styled from "styled-components";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref}>
      {!isUser && <Username>{message.username}</Username>}
      <Card
        className={`message ${
          isUser ? "message__userCard" : "message__guestCard"
        }`}
      >
        <CardContent style={{ margin: "0px", padding: "0px" }}>
          <Typography
            variant="h5"
            component="h2"
            style={{ fontSize: "17px", fontFamily: "poppins" }}
          >
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;

const Username = styled.p`
  padding-left: 10px;
  padding-bottom: 4px;
  margin: 0px;
  font-weight: 700;
`;
