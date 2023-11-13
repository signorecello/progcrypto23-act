import React from 'react';
import { inconsolata } from '../../fonts/fonts';

const CodeSnippet = () => {
  const { lavender, salmon, dodgerBlue } = {
    lavender: { color: '#E4BAFF' },
    salmon: { color: '#FF855F' },
    dodgerBlue: { color: '#75BCFB' },
  };

  return (
    <div
      style={{
        background: 'linear-gradient(75deg, #321E4C 2.27%, #08040C 100%)',
        border: '1px solid #ffffff',
        borderRadius: '6px',
        boxShadow: '0px 16px 80px 0px rgba(0, 0, 0, 0.64)',
        gap: '10px',
        margin: '40px 0',
        padding: '20px 10px',
      }}
    >
      <pre
        style={{
          display: 'inline-block',
          fontSize: '15px',
          fontWeight: 400,
          margin: 0,
          textAlign: 'left',
          whiteSpace: 'pre-wrap',
        }}
      >
        <code className={inconsolata.className}>
          <span style={lavender}>fn</span> <span style={salmon}>main</span>(
          <br />
          {'  '}
          <span style={dodgerBlue}>answer: Field, </span>
          <br />
          {'  '}
          <span style={dodgerBlue}>answerHash</span> : <span style={lavender}>pub</span>{' '}
          <span style={dodgerBlue}>Field</span>)
          <br />
          {'{'}
          <br />
          {'  '}
          <span style={lavender}>let</span> <span style={salmon}>hash</span> ={' '}
          <span style={dodgerBlue}>pederson</span>([
          <span style={dodgerBlue}>answer</span>])[<span style={salmon}>0</span>];
          <br />
          {'  '} <span style={dodgerBlue}>assert</span>({''}
          <span style={dodgerBlue}>hash</span> == <span style={dodgerBlue}>answerHash</span>);
          <br />
          {'}'}
        </code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
