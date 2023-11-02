import styled from 'styled-components';

export const StyledTreeContainer = styled.div<{ isModalOpen: boolean }>`
  opacity: ${props => (props.isModalOpen ? 0.5 : 1)};
`;
