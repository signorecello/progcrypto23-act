'use client';

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { StyledHeader, StyledParagraph, StyledSubheader } from '../../styles/Typography';
import { StyledNodeProofInput } from '../addProof/addProof.styles';
import { StyledButton, ButtonsContainer } from '../../styles/Buttons';
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

export default function Quiz({ stickerId, back, setProofParams }) {
  const [userInput, setUserInput] = useState<{ [key: string]: string }>({
    username: 'zpedrongmi',
  });
  const [cheats, setCheats] = useState<{ [key: string]: string }>({});
  const [pending, setPending] = useState(false);

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

  const submit = async ({ withExtra }: { withExtra?: boolean }) => {
    if (withExtra) toast.info("Too late, I'm proving stuff for you anyway lol");
    try {
      setPending(true);

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
      toast.info('I hate quizzes. Try an empty answer.');
    } finally {
      setPending(false);
    }
  };

  return (
    <QuizContainer>
      <StyledSubheader>When was Ethereum launched?</StyledSubheader>
      <StyledAnswer name="answer" type="number" placeholder="wen" onChange={handleChange} />
      <StyledParagraph>A username (optional)</StyledParagraph>
      <StyledAnswer name="username" type="text" placeholder="@zpedrongmi" onChange={handleChange} />

      <ButtonsContainer>
        <StyledButton primary="true" onClick={() => submit} isDisabled={pending}>
          Submit
        </StyledButton>
        <StyledButton onClick={() => submit({ withExtra: true })} isDisabled={pending}>
          Too hard, I give up
        </StyledButton>
      </ButtonsContainer>
    </QuizContainer>
  );
}
