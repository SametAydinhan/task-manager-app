"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  border?: string;
  color?: string;
}

const Button = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color
}: Props) => {
  const { theme } = useGlobalState();

  return (
    <ButtonStyled
      theme={theme}
      type={type}
      style={{
        backgroundColor: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
        color: color || theme.colorGrey0,
      }}
      onClick={click}
    >
      {icon && icon}
      {name && name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  cursor: pointer;
  transition: all 0.55s ease-in-out;
  i {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colorGrey2};
    margin-right: 1rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Button;
