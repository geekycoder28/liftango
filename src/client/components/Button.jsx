import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 100px;
  border: 1px solid rgba(25, 118, 210, 0.5);
  color: #1976d2;
  padding: 10px 20px;
  border-radius: 4px;

  &:hover {
    border-color: #1976d2;
    cursor: pointer;
  }
  &:not(:last-child) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  ${(props) =>
    props.isSelected &&
    `
    color: #fff;
    background-color: #1976d2;
  `}
`;

const Button = ({ label, isSelected, onClick }) => {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      {label}
    </Container>
  );
};

export default Button;
