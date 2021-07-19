import React from 'react';
import styled from 'styled-components';
import Pin from '../../images/pin.png';

const StyledMarker = styled.div`
  ${(props) =>
    props.backgroundImage &&
    `
    width: 10px;
    height: 20px;
    background-size: contain;
    background-image: url(${props.backgroundImage});
  `}
`;

const Title = styled.span`
  position: absolute;
  width: 40px;
  text-align: center;
  top: -18px;
  left: -15px;
  font-size: 15px;
  color: ${(props) => (props.type === 'departure' ? 'black' : 'white')};
`;

const MapMarkerPin = ({ type }) => {
  if (!type) {
    return null;
  }

  return (
    <StyledMarker backgroundImage={Pin}>
      <Title type={type}>{type !== 'completed' ? type[0].toUpperCase() : 'D-A'}</Title>
    </StyledMarker>
  );
};

export default MapMarkerPin;
