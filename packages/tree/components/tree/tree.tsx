import React, { useEffect, ReactElement, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

import { NoirAggregatorContext } from '../noir';
import { node } from 'prop-types';

import { fromHex, padHex, toHex } from 'viem';
import { Fr } from '@signorecello/bb.js';
import { NoirAggregatorProvider } from '../noir';

import clientPromise from '../../utils/db/mongo';
import { Db, MongoClient } from 'mongodb';
import { ProofData } from '@noir-lang/types';

interface TreeNodeProps {
  level: number;
  index: number;
  proofs: any[];
}

const TreeNode : React.FC<TreeNodeProps> = ({ level, index, proofs }) => {
  const { noir, backend } = useContext(NoirAggregatorContext)!;

  const [nodeStyle, setNodeStyle] = useState({});

  const leftChildIndex = 2 * index;
  const rightChildIndex = 2 * index + 1;

  const verifyRecursive = async (level : number) => {
    if (level == 0) return;

    try {
      console.log("fetching left proof at", {
          level: level - 1,
          index: leftChildIndex,
        })
      let leftRes = await fetch('/api/getProof', {
        method: 'POST',
        body: JSON.stringify({
          level: level - 1,
          index: leftChildIndex,
        }),
      });
      const { proof: leftProof } = await leftRes.json();
      let { vk, proof, answerHash, vkHash } = leftProof;
      const left = {
        proof,
        publicInputs: answerHash,
        aggregation: new Array(16).fill(padHex('0x0', { size: 32 })),
      };

      console.log("fetching right proof at", {
          level: level - 1,
          index: rightChildIndex,
        })
      let rightRes = await fetch('/api/getProof', {
        method: 'POST',
        body: JSON.stringify({
          level: level - 1,
          index: rightChildIndex,
        }),
      });
      const { proof: rightProof } = await rightRes.json();
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

      const { witness, returnValue } = await noir.execute(inputs);
      const begin = new Date().getTime();
      console.log(begin);
      console.log(inputs);
      console.log(backend)

      const { proof: recProof, publicInputs } = (await toast.promise(
        backend.generateIntermediateProof(witness),
        {
          pending: 'Generating proof...',
          success: 'Proof generated!',
        },
      )) as ProofData;

      const hexRecProof = toHex(recProof);
      const hexPublicInputs = toHex(publicInputs[0]);
      console.log(recProof, publicInputs);
      const end = new Date().getTime();
      console.log(end);

      console.log('Duration of proof generation: ', end - begin, 'ms');
      const submitProof = fetch('/api/submitAggregatedProof', {
        method: 'POST',
        body: JSON.stringify({
          level,
          index,
          proof: hexRecProof,
          publicInputs: hexPublicInputs,
        }),
      });

      await toast.promise(submitProof, {
        pending: 'Submitting proof...',
        success: 'Proof submitted!',
      })

    } catch (e) {
      console.log(e);
    }
  };

  const getHasProof = useCallback(async () => {
    const keyExists = proofs.find(p => p.index == index && p.level == level);
    const style = {
      "background-image": keyExists ? "linear-gradient(19deg, green, 3.18%, rgb(255, 255, 255) 100%)" : 'linear-gradient(19deg, #f9e8fe, 3.18%, rgb(255, 255, 255) 100%)',
    };

    setNodeStyle(style);
  }, [proofs, index, level]);

  useEffect(() => {
    if (index >= 0 && level >= 0) getHasProof();
  }, [level, index, getHasProof]);

  if (level < 0) {
    return <></>;
  }

  return (
    <>
      <label
          className="tree-node"
          style={nodeStyle}
          onClick={(e) => {e.stopPropagation(); return verifyRecursive(level)}}
        >{`${level}-${index}`}</label>
      <ul>
        <li>
          <TreeNode proofs={proofs} level={level - 1} index={leftChildIndex}  />
        </li>
        <li>
          <TreeNode proofs={proofs} level={level - 1} index={rightChildIndex} />
        </li>
      </ul>
    </>
    
  );
}


interface TreeProps {
  depth: number;
}

const Tree : React.FC<TreeProps> = ({ depth }) => {
  const [mongos, setMongos] = useState<{ client: MongoClient; db: Db } | null>(null);
  const [proofs, setProofs] = useState<any | null>(null);

  useEffect(() => {
    const getProofs = async () => {
        const res = await fetch('/api/getProofs?level=0', {
          method: 'GET',
        });
        const { proofs } = await res.json();
        setProofs(proofs);
    }
    getProofs();
    const dbTimeout = setInterval(getProofs, 5000)
    return () => clearInterval(dbTimeout);
  }, []);

  return (
    <NoirAggregatorProvider>
      {proofs && (
        <ul>
          <li>
          <TreeNode
            key={proofs.length}
            proofs={proofs}
            level={depth}
            index={0}
          />
          </li>
        </ul>
      )}
      {/* <Leaf stickerId={0} leafProps={activeLeaf} toggleModal={setActive} /> */}
    </NoirAggregatorProvider>
  );
}
export default Tree;
