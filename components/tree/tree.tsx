import React, { useEffect, ReactElement } from 'react';
import styled from 'styled-components';
import { StyledTreeContainer } from './tree.styles';

function LeafButton({ level, index, nodeClickListener }) {
  function onClick() {
    nodeClickListener({ level, index });
  }

  return <div className="tree-node" onClick={onClick}>{`${level}-${index}`}</div>;
}

function TreeNode({ level, index, nodeClickListener }) {
  if (level === 0) {
    return <LeafButton level={level} index={index} nodeClickListener={nodeClickListener} />;
  }

  const leftChildIndex = 2 * index;
  const rightChildIndex = 2 * index + 1;

  return (
    <div className="tree-node-container">
      <div className="tree-node">{`${level}-${index}`}</div>
      <div className="tree-node-children">
        <TreeNode level={level - 1} index={leftChildIndex} nodeClickListener={nodeClickListener} />
        <TreeNode level={level - 1} index={rightChildIndex} nodeClickListener={nodeClickListener} />
      </div>
    </div>
  );
}

function Tree({ depth, nodeClickListener, isModalOpen }) {
  return (
    <StyledTreeContainer isModalOpen={isModalOpen} className="tree-container">
      <TreeNode level={depth} index={0} nodeClickListener={nodeClickListener} />
    </StyledTreeContainer>
  );
}
export default Tree;
