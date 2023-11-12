import React, { useState } from 'react';
import {
  Spacer,
  Container,
  Section,
  Text,
  ImageSection,
  ImageBgWrapper,
  Input,
} from './components';
import CustomButton from './components/layout/Button';

const Phone2 = () => {
  const [answer, setAnswer] = useState('');
  console.log(answer);

  const imageUrl = '/meme-snape.png';

  return (
    <>
      <div style={{ background: '#321E4C' }}>
        <Container>
          <Spacer y={40} />
          <Section>
            <Text color="#EEEDF1" fontSize="16px">
              It will prove you know this answer,
              <br />
              <span style={{ fontWeight: '700' }}>without revealing it!</span>
            </Text>
            <Spacer y={10} />
            <Text color="#E4BAFF" fontSize="16px" width="60%">
              Check out the Aztec booth to see me verify your answer... inside another circuit!
            </Text>
          </Section>
          <Spacer y={10} />
          <ImageSection imageUrl={imageUrl} />
          <Spacer y={5} />
          <ImageBgWrapper>
            <Section>
              <Text color="#CECBD5" fontSize="16px" width="70%">
                Oh, I already know how the hash of the answer look like!
              </Text>
              <Spacer y={10} />
              <Text color="#CECBD5" fontSize="16px" fontWeight="700" width="75%">
                0x883e7911d835097629f0067531fc15cafd79a89beecv39903f69572c636f4a5a
              </Text>
            </Section>
            <Spacer y={15} />
            <Section>
              {' '}
              <Text color="" fontSize="22px" fontWeight="700">
                When was Ethereum launched?
              </Text>
              <Spacer y={10} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
                <Input
                  placeholder="2023"
                  onChange={event => {
                    setAnswer(event.target.value);
                  }}
                />
                <CustomButton
                  label="Back"
                  background="linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)"
                />
              </div>
            </Section>
          </ImageBgWrapper>
        </Container>
      </div>
    </>
  );
};

export default Phone2;
