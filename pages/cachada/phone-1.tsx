import React from 'react';
import {
  Spacer,
  Container,
  Section,
  H1,
  Text,
  ImageSection,
  CodeSnippet,
  ImageBgWrapper,
} from './components';
import CustomButton from './components/layout/Button';

const Phone3 = ({ name = 'Hunter!' }) => {
  // const imageUrl = '/image-2.png';
  const imageUrl = '/intro_gif.gif';

  return (
    <>
      <div style={{ background: '#321E4C' }}>
        <Container>
          <Spacer y={40} />
          <Section>
            <H1 color="#96A0FF" fontSize="28px">
              Welcome, {name}
            </H1>
            <Spacer y={10} />
            <Text color="EEEDF1" fontSize="16">
              Embark on Noir&apos;s Recursive
              <br /> Aggregation Activation Journey
            </Text>
          </Section>
          <Spacer y={20} />
          <ImageSection imageUrl={imageUrl} />
          <Spacer y={20} />
          <ImageBgWrapper>
            <Section>
              <Text fontSize="22px" fontWeight="700">
                Can you decipher the
                <br /> purpose of this circuit?
              </Text>
            </Section>
            <Section>
              {' '}
              <CodeSnippet />
              <Spacer y={5} />
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <CustomButton
                  label="No/Yes"
                  background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                />
                <CustomButton
                  label="GTFO"
                  background="linear-gradient(0deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.48) 100%), linear-gradient(74deg, rgba(253, 38, 154, 0.40) 4.49%, rgba(255, 157, 136, 0.40) 114.81%)"
                />
              </div>
            </Section>
          </ImageBgWrapper>
        </Container>
      </div>
    </>
  );
};

export default Phone3;
