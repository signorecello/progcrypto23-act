import styled from 'styled-components';

export const StyledHeader = styled.h1`
  font-size: 2.25rem; // 36px
  color: #333; // A neutral, strong color for headers
  margin-top: 1.25rem; // 20px
  margin-bottom: 1.25rem; // 20px
  font-weight: 600; // Medium to bold font weight for better readability
  text-align: center; // Centers the header text
  line-height: 1.2; // Gives a comfortable reading line height
`;

export const StyledSubheader = styled.h2`
  font-size: 1.5rem; // 24px
  color: #555; // Slightly lighter than the header for hierarchy
  margin-top: 1rem; // 20px
  margin-bottom: 1rem; // 20px
  font-weight: 500; // Slightly less weight than the header
  text-align: center; // Centers the subheader text
  line-height: 1.3; // Line height for subheaders can be slightly more
`;

export const StyledParagraph = styled.p`
  font-size: 1.125rem; // 18px
  color: #666; // Even lighter for regular text to differentiate from headings
  margin-bottom: 1.25rem; // 20px
  line-height: 1.6; // Increased line height for paragraph readability
  text-align: center; // Centers the paragraph text
`;
