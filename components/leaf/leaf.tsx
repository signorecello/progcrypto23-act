import { useState, useEffect, useContext } from 'react';

import { toast } from 'react-toastify';
import React from 'react';
import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { BackendInstances, Noirs, ProofArtifacts } from '../../types';
import { useAccount, useConnect, useContractWrite, useWaitForTransaction } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import abi from '../../utils/verifierAbi.json';
import axios from 'axios';

import { initializeResolver } from '@noir-lang/source-resolver';
import newCompiler, { compile } from '@noir-lang/noir_wasm';
import Ethers from '../../utils/ethers';
import main from '../../circuits/main/target/main.json';
import aggregator from '../../circuits/aggregator/target/aggregator.json';
import { fromHex, padHex } from 'viem';
import { publicInputsDB, cheats } from '../../utils/publicInputsToMain';
import { CompiledCircuit } from '@noir-lang/types';
import { NoirContext } from '../context';
import { StyledHeader, StyledParagraph } from '../../styles/Typography';
import {
  StyledNodeButton,
  StyledNodeContainer,
  StyledNodeProofInput,
  StyledNodeNumberInput,
} from './leaf.styles';

export type LeafProps = {
  level?: number;
  index?: number;
};

type NodeComponentProps = {
  stickerId: number;
  leafProps: LeafProps;
  aggregation?: string[];
  toggleModal: (LeafProps) => void;
};

type UserInput = {
  x?: string;
  y?: string;
};

// Node Component verifies a proof, so it has a recursive backend
// it will push the resulting proof up the tree
function Leaf({ leafProps, aggregation, toggleModal }: NodeComponentProps) {
  const { noirs, backends } = useContext(NoirContext)!;
  const [stickerId, setStickerId] = useState<number>(0);

  const [userInput, setUserInput] = useState<UserInput>({});
  const [proofArtifacts, setProofArtifacts] = useState<{
    [key: string]: ProofArtifacts;
  }>();

  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const changeStickerId = e => {
    e.preventDefault();
    setStickerId(e.target.value);
  };

  const storeArtifacts = async (mainproof: string, direction: string) => {
    // Get the rest of the data from main proofs
    const proofBytes = fromHex(mainproof as `0x${string}`, 'bytes');
    const pubInputsBytes = fromHex(publicInputsDB[stickerId] as `0x${string}`, 'bytes');
    const { proofAsFields, vkAsFields, vkHash } =
      await backends!.main.generateIntermediateProofArtifacts(
        { publicInputs: [pubInputsBytes], proof: proofBytes },
        1,
      );

    const pA = {
      vkAsFields,
      proofAsFields,
      publicInputs: [publicInputsDB[stickerId]],
      vkHash,
      aggregation: aggregation ? aggregation : new Array(16).fill(padHex('0x0', { size: 32 })),
    };
    console.log(pA);
    setProofArtifacts(prevState => ({ ...prevState, [direction]: pA }));
  };

  const submit = async () => {
    console.log(Date.now());
    await storeArtifacts(userInput!.x!, 'left');
    await storeArtifacts(userInput!.y!, 'right');
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
    const { witness, returnValue } = await noirs!.aggregator.execute(inputs);
    const { publicInputs, proof } = await backends!.aggregator.generateIntermediateProof(witness);
    console.log(Date.now());

    console.log('aggregation proof', proof);
    setProofArtifacts(undefined);
  };

  useEffect(() => {
    if (proofArtifacts && proofArtifacts!['left'] && proofArtifacts!['right'])
      generateProof(proofArtifacts!);
  }, [proofArtifacts]);

  return (
    <StyledNodeContainer>
      <StyledHeader>Recursive!</StyledHeader>
      <StyledParagraph>What's your card ID?</StyledParagraph>
      <StyledNodeNumberInput
        name="stickerId"
        type="number"
        placeholder="0"
        onChange={changeStickerId}
        value={stickerId}
      />

      <StyledParagraph>Write your proofs</StyledParagraph>
      <StyledNodeProofInput
        name="x"
        type="text"
        placeholder="0xB105F00D..."
        onChange={handleChange}
        value={userInput?.x}
      />
      <StyledNodeProofInput
        name="y"
        type="text"
        placeholder="0xB105F00D..."
        onChange={handleChange}
        value={userInput?.y}
      />
      <StyledNodeButton onClick={submit} isDisabled={!userInput.x || !userInput.y}>
        Submit!
      </StyledNodeButton>
      <StyledNodeButton onClick={toggleModal}>Close</StyledNodeButton>
    </StyledNodeContainer>
  );
}

export default Leaf;
