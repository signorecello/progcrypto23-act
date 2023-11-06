'use client';

import { useState, useEffect, useContext, Dispatch } from 'react';

import React from 'react';
import { DBProof, DBPutBody, ProofArtifacts } from '../../types';
import { fromHex, padHex } from 'viem';
import { publicInputsDB, cheats } from '../../utils/publicInputsToMain';
import { NoirAggregatorContext } from '../noirContext/aggregator';
import { StyledHeader, StyledParagraph } from '../../styles/Typography';
import { StyledButton } from '../../styles/Buttons';
import {
  StyledNodeContainer,
  StyledNodeProofInput,
  StyledNodeNumberInput,
} from './addProof.styles';
import { addLeaf, db } from '../../utils/db/dexie';
import { toast } from 'react-toastify';

export type LeafProps = {
  level?: number;
  index?: number;
};

// Node Component verifies a proof, so it has a recursive backend
// it will push the resulting proof up the tree
function AddProof({ setModalOpen }) {
  const { noir, backend } = useContext(NoirAggregatorContext)!;
  const [stickerId, setStickerId] = useState<number>(0);

  const [userInput, setUserInput] = useState<{ username: string } | null>(null);
  const [proofArtifacts, setProofArtifacts] = useState<{
    [key: string]: ProofArtifacts;
  }>();

  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setUserInput({ ...userInput, username: e.target.value });
  };

  const storeArtifacts = async (mainproof: string, direction: string) => {
    // Get the rest of the data from main proofs
    const proofBytes = fromHex(mainproof as `0x${string}`, 'bytes');
    const pubInputsBytes = fromHex(publicInputsDB[stickerId] as `0x${string}`, 'bytes');
    const { proofAsFields, vkAsFields, vkHash } = await backend.generateIntermediateProofArtifacts(
      { publicInputs: [pubInputsBytes], proof: proofBytes },
      1,
    );

    const pA = {
      vkAsFields,
      proofAsFields,
      publicInputs: [publicInputsDB[stickerId]],
      vkHash,
      aggregation: new Array(16).fill(padHex('0x0', { size: 32 })),
    };
    console.log(pA);
    setProofArtifacts(prevState => ({ ...prevState, [direction]: pA }));
  };

  const submit = async () => {
    console.log(Date.now());
    try {
      const res = await fetch(`/api/getProof?username=${userInput?.username}`, {
        method: 'GET',
      });

      const { username, proof, answerHash, _id }: DBProof = await res.json();

      addLeaf({ username, proof, answerHash, _id });
    } catch (err) {
      const error = (err as Error).message;
      toast.error(error);
    }
  };

  const generateProof = async (proofArtifacts: { [key: string]: ProofArtifacts }) => {
    const inputs = {};
    Object.keys(proofArtifacts).forEach(key => {
      console.log(key);
      inputs[`${key}_proof`] = proofArtifacts[key].proofAsFields;
      inputs[`${key}_public_inputs`] = proofArtifacts[key].publicInputs;
    });
    // aggregation is left's aggregation, right will be computed within the circuit
    // we will also use left's vk and vk_hash, they're the same after all
    inputs['incoming_aggregation'] = proofArtifacts['left'].aggregation;
    inputs['vk'] = proofArtifacts['left'].vkAsFields;
    inputs['vk_hash'] = proofArtifacts['left'].vkHash;
    console.log(inputs);
    const { witness, returnValue } = await noir.execute(inputs);
    const { publicInputs, proof } = await backend.generateIntermediateProof(witness);
    console.log(Date.now());

    console.log('aggregation proof', proof);
    setProofArtifacts(undefined);
  };

  // useEffect(() => {
  //   if (proofArtifacts && proofArtifacts!['left'] && proofArtifacts!['right'])
  //     generateProof(proofArtifacts!);
  // }, [proofArtifacts]);

  return (
    <StyledNodeContainer>
      <StyledHeader>Recursive!</StyledHeader>
      <StyledParagraph>Username:</StyledParagraph>

      <StyledNodeProofInput
        name="username"
        type="text"
        placeholder="0xB105F00D..."
        onChange={handleChange}
        value={userInput?.username}
      />
      <StyledButton onClick={submit} isDisabled={!userInput?.username}>
        Submit!
      </StyledButton>
      <StyledButton onClick={() => setModalOpen(false)}>Close</StyledButton>
    </StyledNodeContainer>
  );
}

export default AddProof;
