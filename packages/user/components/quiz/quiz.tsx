'use client';
import {
  Spacer,
  Container,
  Section,
  Text,
  ImageSection,
  ImageBgWrapper,
  Input,
  H1
} from '../components';
import CustomButton from '../components/layout/Button';

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { StyledHeader, StyledParagraph, StyledSubheader } from '../../styles/Typography';
import { StyledButton, ButtonsContainer } from '../../styles/Buttons';
import { QuizContainer, StyledBigFatHash } from './quiz.styles';
import { CompiledCircuit, ProofData } from '@noir-lang/types';
import { toast } from 'react-toastify';

import { toHex } from 'viem';

export default function Quiz({ noirInstance, questionId, quiz, setProofParams }) {
  const [userInput, setUserInput] = useState<{ [key: string]: string }>({
    username: 'zpedrongmi',
  });
  const [cheats, setCheats] = useState<{ [key: string]: string }>({});
  const [pending, setPending] = useState(false);

  const { noir, backend } = noirInstance

  const handleChange = e => {
    e.preventDefault();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const getCheats = async () => {
    const res = await fetch(`/api/getAnswerHash?stickerId=${questionId}`, {
      method: 'GET',
    });
    const { answer, answerHash } = await res.json();
    console.log(questionId, answer, quiz.answer, answerHash)
    setCheats({ answerHash });
  };


  useEffect(() => {
    console.log(quiz)
    getCheats();
  }, []);

  const submit = async ({ withExtra }: { withExtra?: boolean }) => {
    setPending(true);

    if (withExtra) toast.info("Too late, I'm proving stuff for you anyway lol");

    try {

      const { witness } = await noir!.execute({
        answer: userInput!.answer,
        answerHash: cheats.answerHash,
      });

      const { proof, publicInputs } = (await toast.promise(
        backend.generateIntermediateProof(witness),
        {
          pending: 'Generating proof...',
          success: 'Proof generated!',
        },
      )) as ProofData;
      const hexProof = toHex(proof);
      const hexPublicInputs = toHex(publicInputs[0]);

      const submitProof = fetch('/api/submitProof', {
        method: 'POST',
        body: JSON.stringify({
          username: userInput!.username,
          questionId,
          proof: hexProof,
          publicInputs: hexPublicInputs,
        }),
      });

      await toast.promise(submitProof, {
        pending: 'Submitting proof...',
        success: 'Proof submitted!',
      })

      setPending(false);

      setProofParams({ username: userInput!.username, proof: hexProof });
    } catch (err) {
      setPending(false);

      console.log(err);
      toast.info('Oops! Try again!');
    } 
  };

  return (
    <>
      <div style={{ background: '#321E4C' }}>
        <Container>
          <Spacer y={40} />
          <Section>

            <H1 color="#96A0FF" fontSize="28px">
              YOU WILL PROVE
            </H1>
            <Spacer y={10} />
            <Text color="#EEEDF1" fontSize="16px">
              you know this answer,
              <br />
              <span style={{ fontWeight: '700' }}>without revealing it!</span>
            </Text>
            <Spacer y={40} />
          </Section>
          <Spacer y={10} />
          <Spacer y={5} />
          <ImageBgWrapper>

            <Spacer y={15} />
            <Section>
              {' '}
              <Text color="" fontSize="22px" fontWeight="700">
                {quiz.question}
              </Text>
              <Spacer y={10} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
              <Text color="" fontSize="18px">
                Answer
              </Text>
                <Input
                  placeholder="2023"
                  name="answer"
                  onChange={handleChange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                  <CustomButton
                    label="That's it?"
                    disabled={pending}
                    onClick={() => submit({ withExtra: false })}
                    background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                  />
                  <CustomButton
                    label="WTF man"
                    disabled={pending}
                    onClick={() => submit({ withExtra: true })}
                    background="linear-gradient(0deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.48) 100%), linear-gradient(74deg, rgba(253, 38, 154, 0.40) 4.49%, rgba(255, 157, 136, 0.40) 114.81%)"
                  />
                </div>
              <Spacer y={20} />

              <H1 color="#96A0FF" fontSize="28px">
                Check out the aztec booth
              </H1>
              <Text color="#E4BAFF" fontSize="16px" width="60%">
                to see me verify your answer... inside another circuit!
              </Text>
              </div>
            </Section>
          </ImageBgWrapper>
        </Container>
      </div>
    </>
  );
}
