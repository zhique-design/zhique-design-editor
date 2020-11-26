import React from 'react';
import ReactDom from 'react-dom';

import { MarkdownEditor } from '../../src';

import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';
import 'github-markdown-css/github-markdown.css';

ReactDom.render(<MarkdownEditor width="90%" onChange={vaule => console.log(vaule)} />, document.getElementById('app'));
