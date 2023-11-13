import {
  Spacer,
  Container,
  Section,
  H1,
  Text,
  ImageSection,
  CodeSnippet,
  ImageBgWrapper,
} from '../components';
import CustomButton from '../components/layout/Button';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TreasureHunt from './images/treasure_hunt.png';
import { StyledHeader, StyledParagraph, StyledSubheader } from '../../styles/Typography';
import { StyledButton, ButtonsContainer } from '../../styles/Buttons';
import { ModalComponent } from '../modal';
import Quiz from './quiz';
import { QuizContainer } from './quiz.styles';
import snape from '../../pages/images/snape.jpg';

import { useSearchParams } from 'next/navigation';
import circuitImage from '../../pages/images/main_circuit.png';
import introGif from '../../pages/images/intro_gif.gif';

export default function QuizIntro({ back, next }) {
  const [introStep, setIntroStep] = useState(0);
  const introGif = '/intro_gif.gif';
  const memeSnape = '/meme-snape.png';

  if (introStep == 0)
    return (
    <>
      <div style={{ background: '#321E4C' }}>
        <Container>
          <Spacer y={40} />
          <Section>
            <H1 color="#96A0FF" fontSize="28px">
              Welcome, Aztec!
            </H1>
              <Spacer y={10} />
            <Text color="EEEDF1" fontSize="16">
              To Noir's Recursive Aggregation journey
            </Text>
          </Section>
          <ImageSection imageUrl={introGif} />
          <ImageBgWrapper>
            <Section>
              <Text fontSize="22px" fontWeight="700">
                This is the worst quiz ever, but
                ARE YOU READY?😈
              </Text>
              </Section>
            <Section>
              <Spacer y={5} />
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <CustomButton
                  label="No/Yes/Wait what?"
                  background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                  onClick={() => setIntroStep(introStep + 1)}
                />
                <CustomButton
                  label="GTFO"
                  onClick={back}
                  background="linear-gradient(0deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.48) 100%), linear-gradient(74deg, rgba(253, 38, 154, 0.40) 4.49%, rgba(255, 157, 136, 0.40) 114.81%)"
                />
              </div>
            </Section>
          </ImageBgWrapper>
          </Container>
        </div>
    </>
    );

  if (introStep == 1)
    return (
      <>
        <div>
          <Container>
          <Spacer y={40} />

          <Section>
            <H1 color="#96A0FF" fontSize="28px">
              Let's do some <b>MAGIC</b> on your phone 🧙
            </H1>
            <Text color="EEEDF1" fontSize="16">
              Can you PROVE you're worthy
              without revealing your answers? 🤔
            </Text>
          </Section>

          <ImageBgWrapper>

            <CodeSnippet />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <CustomButton
                label="Yes master"
                background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                onClick={() => setIntroStep(introStep + 1)}
              />
              <CustomButton
                label="Pls dont hurt me"
                onClick={() => setIntroStep(introStep + 1)}
                background="linear-gradient(0deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.48) 100%), linear-gradient(74deg, rgba(253, 38, 154, 0.40) 4.49%, rgba(255, 157, 136, 0.40) 114.81%)"
              />
            </div>
          </ImageBgWrapper>

          </Container>
        </div>
      </>
    );

  if (introStep == 2)
    return (
      <>
        <div>
          <Container>
          <Spacer y={40} />

          <Section>
            <H1 color="#96A0FF" fontSize="28px">
              Visit the AZTEC booth, padawan
            </H1>

            <Text color="EEEDF1" fontSize="16">
              And recursively verified, your proof will be
            </Text>
            </Section>
          <ImageSection imageUrl={memeSnape} />


          <ImageBgWrapper>
            <CodeSnippet />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <CustomButton
                label="Alright"
                background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                onClick={() => setIntroStep(introStep + 1)}
              />
              <CustomButton
                label="Please don't mix Hogwarts with Star Wars"
                onClick={() => setIntroStep(introStep + 1)}
                background="linear-gradient(0deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.48) 100%), linear-gradient(74deg, rgba(253, 38, 154, 0.40) 4.49%, rgba(255, 157, 136, 0.40) 114.81%)"
              />
            </div>
          </ImageBgWrapper>

          </Container>
        </div>
      </>

    );

  if (introStep == 3)
    return (

      <>
        <div>
          <Container>
          <Spacer y={40} />

          <Section>
            <H1 color="#96A0FF" fontSize="28px">
              ARE YOU READY?
            </H1>
          </Section>
          
          <ImageBgWrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <CustomButton
                label="FFS"
                background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                onClick={next}
              />
            </div>
          </ImageBgWrapper>
          
          </Container>
        </div>
      </>

    );
}
