import styled from 'styled-components';

export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  height: 100vh;
  justify-content: center;
`;

export const StyledBigFatHash = styled.p`
  font-size: 1rem; // 16px
  color: #666;
  word-wrap: break-word;
  width: 80%;
  margin-bottom: 1.25rem; // 20px
  line-height: 1.6; // Consistent line height with paragraphs
  text-align: center; // Centers the modal paragraph text
`;
