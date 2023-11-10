import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TreasureHunt from './images/treasure_hunt.png';
import { StyledHeader, StyledParagraph, StyledSubheader } from '../../styles/Typography';
import { StyledButton, ButtonsContainer } from '../../styles/Buttons';
import { ModalComponent } from '../modal';
import Quiz from '../../components/quiz/quiz';
import { QuizContainer } from '../../components/quiz/quiz.styles';
import snape from '../../pages/images/snape.jpg';

import { useSearchParams } from 'next/navigation';
import circuitImage from '../../pages/images/main_circuit.png';
import introGif from '../../pages/images/intro_gif.gif';

const ImageContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

export default function QuizIntro({ back, next }) {
  const [introStep, setIntroStep] = useState(0);

  if (introStep == 0)
    return (
      <QuizContainer>
        <StyledHeader>Welcome, Aztec!</StyledHeader>
        <StyledSubheader>To Noir's Recursive Aggregation journey</StyledSubheader>

        <ImageContainer>
          <Image src={introGif} alt="Gif" layout="responsive" />
        </ImageContainer>

        <StyledParagraph>This is the worst quiz ever, but</StyledParagraph>
        <StyledSubheader>ARE YOU READY?😈</StyledSubheader>

        <StyledParagraph>
          This quiz will take about 1 ethereum block time to conclude.
        </StyledParagraph>

        <ButtonsContainer>
          <StyledButton primary={'true'} onClick={() => setIntroStep(introStep + 1)}>
            No/Yes
          </StyledButton>
          <StyledButton onClick={back}>GTFO</StyledButton>
        </ButtonsContainer>
      </QuizContainer>
    );

  if (introStep == 1)
    return (
      <QuizContainer>
        <StyledParagraph>
          Let's do some <b>MAGIC</b> on your phone 🧙
        </StyledParagraph>
        <StyledSubheader>Can you PROVE you're worthy</StyledSubheader>
        <StyledParagraph>without revealing your answers? 🤔</StyledParagraph>
        <ImageContainer>
          <Image src={circuitImage} alt="Circuit details" layout="responsive" />
        </ImageContainer>

        <ButtonsContainer>
          <StyledButton primary={'true'} onClick={() => setIntroStep(introStep + 1)}>
            Yes master
          </StyledButton>
          <StyledButton onClick={() => setIntroStep(introStep - 1)}>Pls don't hurt me</StyledButton>
        </ButtonsContainer>
      </QuizContainer>
    );

  if (introStep == 2)
    return (
      <QuizContainer>
        <StyledSubheader>Visit the AZTEC booth, padawan</StyledSubheader>
        <StyledParagraph>And recursively verified, this proof will be</StyledParagraph>
        <ImageContainer>
          <Image src={snape} alt="Gif" layout="responsive" />
        </ImageContainer>

        <ButtonsContainer>
          <StyledButton
            style={{ flex: '1 0 auto' }}
            primary={'true'}
            onClick={() => setIntroStep(introStep + 1)}
          >
            Alright
          </StyledButton>
          <StyledButton onClick={() => setIntroStep(introStep - 1)}>
            Please don't mix Hogwarts with Star Wars
          </StyledButton>
        </ButtonsContainer>
      </QuizContainer>
    );

  if (introStep == 3)
    return (
      <QuizContainer>
        <StyledSubheader>ARE YOU READY?</StyledSubheader>
        <ButtonsContainer>
          <StyledButton style={{ flex: '1 0 auto' }} primary={'true'} onClick={next}>
            YES, FFS 😠
          </StyledButton>
        </ButtonsContainer>
      </QuizContainer>
    );
}
