import styled from 'styled-components';

export const StyledNodeContainer = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StyledNodeProofInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

export const StyledNodeNumberInput = styled(StyledNodeProofInput)`
  width: 50%;
`;

export const StyledNodeButton = styled.button<{ isDisabled?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 16px;
  margin-right: 10px;

  background-color: ${props => (props.isDisabled ? 'lightgray' : '#007BFF')};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${props => (props.isDisabled ? 'lightgray' : '#0056b3')};
    transform: translateY(-2px);
  }

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: none;
  }

  &:nth-child(3) {
    background-color: #007bff;
    color: #fff;
  }

  &:last-child {
    background-color: transparent;
    border: 1px solid #007bff;
    color: #007bff;
  }

  &:last-child:hover {
    background-color: #007bff;
    color: #fff;
  }
`;
