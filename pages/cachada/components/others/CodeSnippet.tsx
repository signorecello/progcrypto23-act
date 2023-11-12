import React from 'react';

const CodeSnippet = () => {
  const lavender = {
    color: '#E4BAFF',
  };

  const salmon = {
    color: '#FF855F',
  };

  const dodgerBlue = {
    color: '#75BCFB',
  };

  return (
    <div
      style={{
        marginTop: '40px',
        marginBottom: '40px',
        padding: '30px 20px 30px 20px',
        borderRadius: '6px',
        gap: '10px',
        border: '1px solid #ffffff',
        background: 'linear-gradient(75deg, #321E4C 2.27%, #08040C 100%)',
        boxShadow: '0px 16px 80px 0px rgba(0, 0, 0, 0.64)',
      }}
    >
      <pre
        style={{
          textAlign: 'left',
          fontFamily: 'inconsolata',
          whiteSpace: 'pre-wrap',
          margin: 0,
          display: 'inline-block',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        <code>
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
