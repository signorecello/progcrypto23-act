import React, { useEffect, ReactElement, useState } from 'react';
import {
  StyledTreeContainer,
  StyledTreeNodeChildren,
  StyledTreeNodeContainer,
} from './tree.styles';
import { NoirAggregatorProvider } from '../../components/noirContext/aggregator';
import AddProof, { LeafProps } from '../addProof/addProof';
import { StyledButton } from '../../styles/Buttons';
import { db } from '../../utils/db/dexie';
import { node } from 'prop-types';

import { useLiveQuery } from 'dexie-react-hooks';

function TreeNode({ level, index, getDepth, isModalOpen }) {
  const [nodeStyle, setNodeStyle] = useState({});

  const leftChildIndex = 2 * index;
  const rightChildIndex = 2 * index + 1;

  const getHasProof = async () => {
    const keyExists = await db.proofs.get({ level, index });
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
      <div className="tree-node" style={nodeStyle}>{`${level}-${index}`}</div>
      <StyledTreeNodeChildren depth={getDepth()}>
        <TreeNode
          level={level - 1}
          index={leftChildIndex}
          getDepth={getDepth}
          isModalOpen={isModalOpen}
        />
        <TreeNode
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
  const [treeNonce, setTreeNonce] = useState(0);
  const proofs = useLiveQuery(() => db.proofs.toArray());

  function getDepth() {
    return depth;
  }

  return (
    <NoirAggregatorProvider>
      {proofs && (
        <StyledTreeContainer>
          <StyledButton primary="true" onClick={() => setModalOpen(!isModalOpen)}>
            Add new proof
          </StyledButton>
          <TreeNode
            key={proofs.length}
            level={depth}
            index={0}
            getDepth={getDepth}
            isModalOpen={isModalOpen}
          />
        </StyledTreeContainer>
      )}

      {isModalOpen && <AddProof setModalOpen={() => setModalOpen(!isModalOpen)} />}

      {/* <Leaf stickerId={0} leafProps={activeLeaf} toggleModal={setActive} /> */}
    </NoirAggregatorProvider>
  );
}
export default Tree;
