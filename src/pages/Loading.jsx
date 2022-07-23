import React from "react";
import styled from "styled-components";
var Spinner = require("react-spinkit");

const Loading = () => {
  return (
    <Container>
      <Image
        src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
        width={190}
        height={120}
      />
      <Spinner name="ball-pulse-sync" color="#1877f2" />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  margin-bottom: 40px;
  user-select: none;
`;
