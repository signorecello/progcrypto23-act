import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TreasureHunt from './images/treasure_hunt.png';
import { StyledHeader, StyledParagraph, StyledSubheader } from '../../styles/Typography';
import { StyledButton } from '../../styles/Buttons';
import { ModalComponent } from '../modal';
import Quiz from '../../components/quiz/quiz';
import { QuizContainer } from '../../components/quiz/quiz.styles';

import { useSearchParams } from 'next/navigation';
import circuitImage from '../../pages/images/main_circuit.png';
import introGif from '../../pages/images/intro_gif.gif';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
`;

const ImageContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

export default function QuizIntro({ back, next }) {
  return (
    <QuizContainer>
      <StyledHeader>Welcome, Hunter!</StyledHeader>
      <StyledSubheader>Embark on Noir's Recursive Aggregation Activation journey</StyledSubheader>
      <ImageContainer>
        <Image src={introGif} alt="Gif" layout="responsive" />
      </ImageContainer>
      <StyledParagraph>Can you decipher the purpose of this circuit?</StyledParagraph>
      <ImageContainer>
        <Image src={circuitImage} alt="Circuit details" layout="responsive" />
      </ImageContainer>
      <ButtonsContainer>
        <StyledButton primary={'true'} onClick={next}>
          No/Yes
        </StyledButton>
        <StyledButton onClick={back}>GTFO</StyledButton>
      </ButtonsContainer>
    </QuizContainer>
  );
}
