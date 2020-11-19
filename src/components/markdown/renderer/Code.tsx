import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeProps {
  language?: string;
  value?: string;
}

const Code: React.FC<CodeProps> = ({ value, language }) => (
  <SyntaxHighlighter
    language={language}
    style={docco}
    showLineNumbers
    wrapLines
  >
    {value}
  </SyntaxHighlighter>
);

Code.defaultProps = {
  language: '',
  value: '',
};

export default Code;
