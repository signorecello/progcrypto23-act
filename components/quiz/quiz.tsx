'use client';

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { StyledHeader, StyledParagraph } from '../../styles/Typography';
import { StyledNodeProofInput } from '../addProof/addProof.styles';
import { publicInputsDB, cheats } from '../../utils/publicInputsToMain';
import snape from '../../pages/images/snape.jpg';
import { StyledButton } from '../../styles/Buttons';
import { QuizContainer, StyledBigFatHash } from './quiz.styles';
import { ProofData } from '@noir-lang/types';
import { toast } from 'react-toastify';

import { NoirMainContext } from '../../components/noirContext/main';
import { toHex } from 'viem';

export const StyledAnswer = styled.input`
  width: 60%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const ImageContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

export default function Quiz({ stickerId, back, setProofParams }) {
  const [userInput, setUserInput] = useState<{ [key: string]: string }>({
    answer: cheats[stickerId],
    username: 'zpedrongmi',
  });
  const { noir, backend } = useContext(NoirMainContext)!;

  const handleChange = e => {
    e.preventDefault();
    console.log(e.target.value);
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // this is a stub, because nargo will only give me final proofs
  // later on each sticker has its own modal and returns its own final proof
  const submit = async () => {
    try {
      console.log(userInput);
      const { witness } = await noir!.execute({
        answer: userInput!.answer,
        answerHash: publicInputsDB[stickerId],
      });

      const intermediateProof = await toast.promise(backend!.generateIntermediateProof(witness), {
        pending: 'Generating proof...',
        success: 'Proof generated!',
      });
      const hexProof = toHex(intermediateProof.proof);

      await fetch('/api/submitProof', {
        method: 'POST',
        body: JSON.stringify({ username: userInput!.username, proof: hexProof, stickerId }),
      });

      setProofParams({ username: userInput!.username, proof: hexProof });
    } catch (err) {
      console.log(err);
      toast.error('Oops! Wrong answer!');
      toast.info('Tip: I hate quizzes. Try an empty answer...');
    }
  };

  return (
    <QuizContainer>
      <StyledParagraph>It will prove you know this answer, without revealing it!</StyledParagraph>

      <StyledParagraph>
        Check out the Aztec booth to see me verify your answer... ...inside another circuit!
      </StyledParagraph>
      <ImageContainer>
        <Image src={snape} alt="Gif" layout="responsive" />
      </ImageContainer>
      <StyledParagraph>When was Ethereum launched?</StyledParagraph>
      <StyledAnswer name="answer" type="text" placeholder="2023" onChange={handleChange} />

      <StyledParagraph>Your username</StyledParagraph>
      <StyledAnswer name="username" type="text" placeholder="zpedrongmi" onChange={handleChange} />

      <StyledButton primary="true" onClick={submit}>
        Submit
      </StyledButton>
      <StyledButton onClick={back}>Back</StyledButton>
    </QuizContainer>
  );
}
