"use client";
import React from "react";
import styled from "styled-components";

interface props {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: props) => {
  return <GlobalStyle>{children}</GlobalStyle>;
};

const GlobalStyle = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;
`;
export default GlobalStyleProvider;
