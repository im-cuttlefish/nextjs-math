import React, { FC } from "react";
import styled from "styled-components";

export const Layout: FC = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  padding: 0 1rem;
`;
