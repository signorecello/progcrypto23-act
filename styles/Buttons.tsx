import styled from 'styled-components';

export const StyledButton = styled.button<{ isDisabled?: boolean; primary?: string }>`
  padding: 10px 20px;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 16px;
  margin-right: 10px;

  background-color: ${props =>
    props.isDisabled ? 'lightgray' : props.primary ? '#007bff' : 'transparent'};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};

  color: ${props => (props.primary ? '#fff' : '#007bff')};

  &:hover {
    background-color: ${props =>
      props.isDisabled ? 'lightgray' : props.primary ? '#007bff' : '#007bff'};
    color: #fff;
    transform: translateY(-2px);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
`;
