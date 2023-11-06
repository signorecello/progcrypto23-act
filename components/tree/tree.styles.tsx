import styled from 'styled-components';

export const StyledTreeContainer = styled.div``;

// Styled component for .tree-node-container
export const StyledTreeNodeContainer = styled.div<{ isModalOpen: boolean }>`
  opacity: ${props => (props.isModalOpen ? 0.5 : 1)};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: ${props => (props.isModalOpen ? 'hidden' : 'visible')};
`;

// Styled component for .tree-node-children
export const StyledTreeNodeChildren = styled.div<{ depth: number }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  top: ${props => (props.depth ? ((1 / props.depth) * 100).toString() + '%' : '10%')};
`;
