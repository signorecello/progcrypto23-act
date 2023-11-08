'use client';

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { StyledHeader, StyledParagraph } from '../../styles/Typography';
import { StyledNodeProofInput } from '../addProof/addProof.styles';
import snape from '../../pages/images/snape.jpg';
import { StyledButton } from '../../styles/Buttons';
import { QuizContainer, StyledBigFatHash } from './quiz.styles';
import { ProofData } from '@noir-lang/types';
import { toast } from 'react-toastify';

import { NoirMainContext } from '../../components/noirContext/main';
import { toHex } from 'viem';
import React from 'react';

export default function QuizEnd({ username, proof }) {
  console.log(username, proof);
  return (
    <QuizContainer>
      <StyledParagraph>Uh yeah, a shiny new proof! Look at this beauty</StyledParagraph>
      <StyledParagraph>
        Username: {username}
        Proof: {proof}
      </StyledParagraph>
      <StyledParagraph>
        Now come visit the Aztec booth and tell me your username! Let's verify your answer...
        Recursively
      </StyledParagraph>
    </QuizContainer>
  );
}
