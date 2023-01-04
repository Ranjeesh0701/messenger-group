import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(err => {
            alert(err.message);
        })
    }

  return (
    <Container>
      <LoginContainer>
        <Image
          src="https://logo-logos.com/2016/10/WhatsApp_logo_icon.png"
          width={120}
          height={120}
        />
        <Button variant="outlined" color="primary" onClick={signIn}>
          Login with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;

const Image = styled.img`
  margin-bottom: 40px;
  user-select: none;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 70px 40px;
  border-radius: 6px;
  box-shadow: 0px 0px 100px -40px #ccc;
`;
