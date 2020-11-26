import React from 'react';
import ReactDom from 'react-dom';

import { MarkdownEditor } from '../../src';

import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';

ReactDom.render(<MarkdownEditor cmOptions={{ mode: 'gfm' }} onChange={vaule => console.log(vaule)} />, document.getElementById('app'));
