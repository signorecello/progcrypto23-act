import React, { useEffect, ReactElement, useState, useContext } from 'react';
import {
  StyledTreeContainer,
  StyledTreeNodeChildren,
  StyledTreeNodeContainer,
} from './tree.styles';
import { NoirAggregatorContext } from '../../components/noirContext/aggregator';
import { StyledButton } from '../../styles/Buttons';
// import { db } from '../../utils/db/dexie';
import { node } from 'prop-types';

import { useLiveQuery } from 'dexie-react-hooks';
import { fromHex, padHex } from 'viem';
import { Fr } from '@signorecello/bb.js';
import { NoirMainContext, NoirMainProvider } from '../noirContext/main';

import clientPromise from '../../utils/db/mongo';
import { Db, MongoClient } from 'mongodb';

function TreeNode({ level, index, getDepth, proofs }) {
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
    if (level == 0) return;
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
      backgroundColor: keyExists ? 'green' : 'red',
    };

    setNodeStyle(style);
  };

  useEffect(() => {
    if (index >= 0 && level >= 0) getHasProof();
  }, [level, index]);

  if (level < 0) {
    return <></>;
  }

  return (
    <StyledTreeNodeContainer>
      {/* Tree node styles need to be in CSS because TreeNode is recursively called */}
      <div
        className="tree-node"
        style={nodeStyle}
        onClick={verifyRecursive}
      >{`${level}-${index}`}</div>
      <StyledTreeNodeChildren depth={getDepth()}>
        <TreeNode proofs={proofs} level={level - 1} index={leftChildIndex} getDepth={getDepth} />
        <TreeNode proofs={proofs} level={level - 1} index={rightChildIndex} getDepth={getDepth} />
      </StyledTreeNodeChildren>
    </StyledTreeNodeContainer>
  );
}

function Tree({ depth }) {
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
          <TreeNode
            key={proofs.length}
            proofs={proofs}
            level={depth}
            index={0}
            getDepth={getDepth}
          />
        </StyledTreeContainer>
      )}
      {/* <Leaf stickerId={0} leafProps={activeLeaf} toggleModal={setActive} /> */}
    </NoirMainProvider>
  );
}
export default Tree;
