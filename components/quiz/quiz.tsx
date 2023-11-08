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
    username: 'zpedrongmi',
  });
  const [cheats, setCheats] = useState<{ [key: string]: string }>({});
  const { noir, backend } = useContext(NoirMainContext)!;

  const handleChange = e => {
    e.preventDefault();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const getCheats = async () => {
    const res = await fetch(`/api/getAnswerHash?stickerId=${stickerId}`, {
      method: 'GET',
    });
    const { answer, answerHash } = await res.json();
    setCheats({ answer, answerHash });
  };

  useEffect(() => {
    getCheats();
  }, []);

  // this is a stub, because nargo will only give me final proofs
  // later on each sticker has its own modal and returns its own final proof
  const submit = async () => {
    try {
      console.log({
        answer: userInput!.answer || cheats.answer,
        answerHash: cheats.answerHash,
      });

      const { witness } = await noir!.execute({
        answer: userInput!.answer || cheats.answer,
        answerHash: cheats.answerHash,
      });

      const { proof, publicInputs } = (await toast.promise(
        backend!.generateIntermediateProof(witness),
        {
          pending: 'Generating proof...',
          success: 'Proof generated!',
        },
      )) as ProofData;
      const hexProof = toHex(proof);
      const hexPublicInputs = toHex(publicInputs[0]);

      await fetch('/api/submitProof', {
        method: 'POST',
        body: JSON.stringify({
          username: userInput!.username,
          stickerId,
          proof: hexProof,
          publicInputs: hexPublicInputs,
        }),
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
