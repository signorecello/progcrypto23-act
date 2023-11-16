'use client';

import { StyledHeader, StyledParagraph } from '../../styles/Typography';
import { QuizContainer } from './quiz.styles';
import React from 'react';

export default function QuizEnd() {
  return (
    <QuizContainer>
      <StyledHeader>That's it!</StyledHeader>
      <StyledParagraph>Now visit the Aztec booth</StyledParagraph>
    </QuizContainer>
  );
}
