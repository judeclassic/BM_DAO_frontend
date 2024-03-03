import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for styling
const Wrapper = styled.div`
  text-align: center;
  margin: 50px;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  
`;

const PopupContent = styled.div`
  position: relative;
  margin: 10% auto;
  width: 80%;
  height: 80%;
  background-color: white;
  border: 1px solid black;

  /* Media query for mobile devices */
  @media only screen and (max-width: 600px) {
    width: 90%; /* Adjusted width for mobile devices */
    height: 90%; /* Adjusted height for mobile devices */
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
  color: black;
  cursor: pointer;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const PopupComponent: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setPopupOpen(false);
    }
  };

  return (
    <Wrapper>
      <h1>My Website</h1>
      <p>Click the button to open a pop-up with another webpage.</p>
      <button onClick={openPopup}>Open Pop-up</button>

      {/* The pop-up container */}
      {isPopupOpen && (
        <PopupContainer onClick={handleOutsideClick}>

          {/* The pop-up content */}
          <PopupContent>
            <CloseButton onClick={closePopup}>×</CloseButton>
            <StyledIframe src="https://files.fm"></StyledIframe> {/* The webpage to embed */}
          </PopupContent>

        </PopupContainer>
      )}
    </Wrapper>
  );
};

export default PopupComponent;
