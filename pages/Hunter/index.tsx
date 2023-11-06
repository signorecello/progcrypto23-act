import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TreasureHunt from './images/treasure_hunt.png';
import { StyledHeader, StyledParagraph, StyledSubheader } from '../../styles/Typography';
import { StyledButton } from '../../styles/Buttons';
import { ModalComponent } from '../../components/modal';
import Quiz from '../../components/quiz/quiz';
import QuizIntro from '../../components/quiz/intro';
import QuizEnd from '../../components/quiz/end';

import { useSearchParams } from 'next/navigation';
import circuitImage from '../../pages/images/main_circuit.png';
import introGif from '../../pages/images/intro_gif.gif';

import { NoirMainProvider } from '../../components/noirContext/main';

// Component
export default function HunterPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [proofParams, setProofParams] = useState<{ username: string; proof: string } | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get('stickerId'));
    console.log(proofParams);
  }, []);

  if (showQuiz && !proofParams) {
    return (
      <NoirMainProvider>
        <Quiz
          stickerId={searchParams.get('stickerId')}
          back={() => setShowQuiz(false)}
          setProofParams={setProofParams}
        />
      </NoirMainProvider>
    );
  } else if (proofParams) {
    return <QuizEnd username={proofParams.username} proof={proofParams.proof} />;
  } else {
    return <QuizIntro back={() => setShowQuiz(false)} next={() => setShowQuiz(true)} />;
  }
}
