import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import TreasureHunt from './images/treasure_hunt.png';
import { StyledHeader, StyledParagraph } from '../styles/Typography';
import { StyledButton } from '../styles/Buttons';
import { ModalComponent } from '../components/modal';

// Styling
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  max-width: 600px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 1;
  top: 10%;
`;

// Component
export default function LandingPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LandingContainer>
        <StyledHeader>Treasure Hunt</StyledHeader>
        <StyledParagraph>Except it's not a hunt. And there's no treasure.</StyledParagraph>
        <ButtonsContainer>
          <Link href="/Hunter">
            <StyledButton primary={'true'}>Go to Hunter page</StyledButton>
          </Link>
          <Link href="/Tree">
            <StyledButton>Go to Tree page</StyledButton>
          </Link>
        </ButtonsContainer>
      </LandingContainer>
    </div>
  );
}
