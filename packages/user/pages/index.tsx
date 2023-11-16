import React, { useContext, useEffect, useState } from 'react';
import Quiz from '../components/quiz/quiz';
import QuizIntro from '../components/quiz/intro';
import QuizEnd from '../components/quiz/end';

import { useSearchParams } from 'next/navigation';
import quiz from '../utils/answers.json';

import { BarretenbergBackend, CompiledCircuit } from '@signorecello/backend_barretenberg';
import main from '../../noir/main/target/main.json';
import { Noir } from '@signorecello/noir_js';
// Component
export default function HunterPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [proofParams, setProofParams] = useState<{ username: string; proof: string }[]>([]);
  const [noir, setNoir] = useState<{ noir: Noir, backend: BarretenbergBackend } | null>(null);

  const addProof = ((proofParams) => {
    setProofParams(prev => {
      return [...prev, proofParams]
    })
    console.log(proofParams)
  })

  const init = async () => {

    let backend : BarretenbergBackend | null = new BarretenbergBackend(main as unknown as CompiledCircuit, {
      threads: window.navigator.hardwareConcurrency,
      memory: {
        initial: 25,
        maximum: 2 ** 14,
      },
    });

    
    let noir : Noir | null = new Noir(main as unknown as CompiledCircuit, backend);
    await noir.init();
    setNoir({noir, backend})
  }

  useEffect(() => {
    init();

    if (noir) return () => { noir.noir.destroy() };
  }, [])

  if (!noir) return <></>;

  if (Object.keys(proofParams).length < quiz.length) {
    if (!showQuiz) { return <QuizIntro back={() => setShowQuiz(false)} next={() => setShowQuiz(true)} /> };
    
    return (
      <Quiz
        noirInstance={noir}
        key={proofParams.length}
        questionId={proofParams.length}
        quiz={quiz[proofParams.length]}
        setProofParams={(e) => addProof(e)}
      />
    );
  } else {
    return <QuizEnd />;
  }
}
