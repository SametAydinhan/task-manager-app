"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
  content: React.ReactNode;
}

const Modal = ({ content }: Props) => {
  const { closeModal, theme } = useGlobalState();

  return (
    <ModalStyled theme={theme}>
      <div className='modal-overlay' onClick={closeModal}></div>
      <div className='modal-content'>{content}</div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 1000;
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    filter: blur(4px);
  }
  .modal-content {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 1001;
    background-color: ${(props) => props.theme.colorBg2};
  }
`;

export default Modal;
