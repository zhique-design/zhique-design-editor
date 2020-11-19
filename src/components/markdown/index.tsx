import React, { Component } from 'react';
import ReactMarkdown, { ReactMarkdownPropsBase } from 'react-markdown';
import gfm from 'remark-gfm';
import { Code } from './renderer';

interface MarkdownProps extends ReactMarkdownPropsBase {
  readonly value?: string;
}

class Markdown extends Component<MarkdownProps> {
  static defaultProps = {
      className: 'markdown-body',
      linkTarget: '_blank',
  };

  render() {
      const { value, ...rest } = this.props;
      return (
        <ReactMarkdown
          plugins={[
            gfm,
          ]}
          renderers={{
            code: Code
          }}
          {...rest}
        >
          {value || ''}
        </ReactMarkdown>
      );
  }
}

export default Markdown;
