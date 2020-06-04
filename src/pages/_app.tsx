import React, { FC } from "react";
import { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Title>ウェブサイトのタイトル</Title>
    <Component {...pageProps} />
    <GlobalStyle />
  </>
);

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    line-height: 1.75;
    font-family: "Noto Sans JP", sans-serif;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
`;

export default App;
