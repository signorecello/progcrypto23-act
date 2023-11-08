import React, { useEffect, ReactElement, useState, useContext } from 'react';
import {
  StyledTreeContainer,
  StyledTreeNodeChildren,
  StyledTreeNodeContainer,
} from './tree.styles';
import { NoirAggregatorContext } from '../../components/noirContext/aggregator';
import AddProof, { LeafProps } from '../addProof/addProof';
import { StyledButton } from '../../styles/Buttons';
// import { db } from '../../utils/db/dexie';
import { node } from 'prop-types';

import { useLiveQuery } from 'dexie-react-hooks';
import { fromHex, padHex } from 'viem';
import { Fr } from '@signorecello/bb.js';
import { NoirMainContext, NoirMainProvider } from '../noirContext/main';

import clientPromise from '../../utils/db/mongo';
import { Db, MongoClient } from 'mongodb';

function TreeNode({ level, index, getDepth, isModalOpen, proofs }) {
  const { noir, backend } = useContext(NoirAggregatorContext)!;

  const [nodeStyle, setNodeStyle] = useState({});

  const leftChildIndex = 2 * index;
  const rightChildIndex = 2 * index + 1;

  // const storeArtifacts = async (mainproof: string, direction: string) => {
  //   // Get the rest of the data from main proofs
  //   const proofBytes = fromHex(mainproof as `0x${string}`, 'bytes');
  //   const pubInputsBytes = fromHex(publicInputsDB[stickerId] as `0x${string}`, 'bytes');
  //   const { proofAsFields, vkAsFields, vkHash } = await backend.generateIntermediateProofArtifacts(
  //     { publicInputs: [pubInputsBytes], proof: proofBytes },
  //     1,
  //   );

  //   const pA = {
  //     vkAsFields,
  //     proofAsFields,
  //     publicInputs: [publicInputsDB[stickerId]],
  //     vkHash,
  //     aggregation: new Array(16).fill(padHex('0x0', { size: 32 })),
  //   };
  //   console.log(pA);
  //   setProofArtifacts(prevState => ({ ...prevState, [direction]: pA }));
  // };

  const verifyRecursive = async () => {
    // need to get children
    // so level - 1, index * 2 and index * 2 + 1
    // const leftProof = fromHex(left!.proof as `0x${string}`, 'bytes');
    // const rightProof = fromHex(right!.proof as `0x${string}`, 'bytes');
    // console.log(Fr.fromString(left!.proof));

    let res = await fetch('/api/getProof', {
      method: 'POST',
      body: JSON.stringify({
        level: level - 1,
        index: index * 2,
      }),
    });
    const { proof: leftProof } = await res.json();
    let { vk, proof, answerHash, vkHash } = leftProof;
    const left = {
      proof,
      publicInputs: answerHash,
      aggregation: new Array(16).fill(padHex('0x0', { size: 32 })),
    };

    res = await fetch('/api/getProof', {
      method: 'POST',
      body: JSON.stringify({
        level: level - 1,
        index: index * 2 + 1,
      }),
    });
    const { proof: rightProof } = await res.json();
    ({ proof, answerHash } = rightProof);
    const right = {
      proof,
      publicInputs: answerHash,
      aggregation: new Array(16).fill(padHex('0x0', { size: 32 })),
    };

    /**
     vk : [Field; 114], 
    vk_hash : Field, 

    left_proof : [Field; 94],
    left_public_inputs: [Field; 1],
    incoming_aggregation : [Field; 16],

    // right main proof
    right_proof : [Field; 94],
    right_public_inputs: [Field; 1],

     */

    const inputs = {
      vk,
      vk_hash: vkHash,
      left_proof: left.proof,
      left_public_inputs: [left.publicInputs],
      incoming_aggregation: left.aggregation,
      right_proof: right.proof,
      right_public_inputs: [right.publicInputs],
    };
    console.log(inputs);

    const { witness, returnValue } = await noir.execute(inputs);

    console.log(witness);
    const recProof = await backend.generateIntermediateProof(witness);
    console.log(recProof);
  };

  const getHasProof = async () => {
    const keyExists = proofs.find(p => p.index == index && p.level == level);
    const style = {
      opacity: isModalOpen ? 0.5 : 1,
      backgroundColor: keyExists ? 'green' : 'red',
    };

    setNodeStyle(style);
  };

  useEffect(() => {
    if (index >= 0 && level >= 0) getHasProof();
  }, [level, index, isModalOpen]);

  if (level < 0) {
    return <></>;
  }

  return (
    <StyledTreeNodeContainer isModalOpen={isModalOpen}>
      {/* Tree node styles need to be in CSS because TreeNode is recursively called */}
      <div
        className="tree-node"
        style={nodeStyle}
        onClick={verifyRecursive}
      >{`${level}-${index}`}</div>
      <StyledTreeNodeChildren depth={getDepth()}>
        <TreeNode
          proofs={proofs}
          level={level - 1}
          index={leftChildIndex}
          getDepth={getDepth}
          isModalOpen={isModalOpen}
        />
        <TreeNode
          proofs={proofs}
          level={level - 1}
          index={rightChildIndex}
          getDepth={getDepth}
          isModalOpen={isModalOpen}
        />
      </StyledTreeNodeChildren>
    </StyledTreeNodeContainer>
  );
}

function Tree({ depth }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mongos, setMongos] = useState<{ client: MongoClient; db: Db } | null>(null);
  const [proofs, setProofs] = useState<any | null>(null);

  function getDepth() {
    return depth;
  }

  useEffect(() => {
    const getProofs = async () => {
      const res = await fetch('/api/getProofs?level=0', {
        method: 'GET',
      });
      const { proofs } = await res.json();
      setProofs(proofs);
    };
    getProofs();
  }, []);

  return (
    <NoirMainProvider>
      {proofs && (
        <StyledTreeContainer>
          <StyledButton primary="true" onClick={() => setModalOpen(!isModalOpen)}>
            Add new proof
          </StyledButton>
          <TreeNode
            key={proofs.length}
            proofs={proofs}
            level={depth}
            index={0}
            getDepth={getDepth}
            isModalOpen={isModalOpen}
          />
        </StyledTreeContainer>
      )}

      {isModalOpen && <AddProof setModalOpen={() => setModalOpen(!isModalOpen)} />}

      {/* <Leaf stickerId={0} leafProps={activeLeaf} toggleModal={setActive} /> */}
    </NoirMainProvider>
  );
}
export default Tree;
