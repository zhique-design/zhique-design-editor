import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import MarkDown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';
import FreeScrollBar from 'react-free-scrollbar';

import CodeBlock from './CodeBlock';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/groovy/groovy';

import './ZhiQueEditor.css';


class ZhiQueEditor extends Component {

    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            text: value || '',
        };
    }

    handleBeforeChange = (editor, data, value) => {
        this.setState({
            text: value,
        });
    };

    handleChange = (editor, data, value) => {
        // todo 完成onChange事件逻辑
        const { onChange} = this.props;
        if (onChange) onChange(value);
    };

    handleScroll = (editor, data) => {
        const { onScroll} = this.props;
        if (onScroll) onScroll(editor, data)
    };

    render() {

        const { height } = this.props;
        const { text } = this.state;
        return (
            <div className="zhique-markdown-editor-wrapper">
                <SplitPane split="horizontal">
                    <div className="zhique-markdown-editor-toolbar">123</div>
                    <div>
                        <SplitPane defaultSize="50%">
                            <div className="zhique-markdown-editor">
                                <CodeMirror
                                    options={{
                                        mode: 'gfm',
                                        theme: 'material',
                                        lineNumbers: true,
                                        autofocus: true,
                                        scrollbarStyle: null
                                    }}
                                    value={text}
                                    onBeforeChange={this.handleBeforeChange}
                                    onChange={this.handleChange}
                                    onScroll={this.handleScroll}
                                    editorDidMount={(editor) => {
                                        editor.setSize('100%', height);
                                        editor.setOption('lineWrapping', 'auto');
                                    }}
                                />
                            </div>
                            <div className="zhique-markdown-preview" style={{ height: typeof height === 'number' ? `${height}px` : height}}>
                                <FreeScrollBar>
                                    <MarkDown
                                        source={text}
                                        renderers={{
                                            code: CodeBlock
                                        }}
                                    />
                                </FreeScrollBar>
                            </div>
                        </SplitPane>
                    </div>
                </SplitPane>
            </div>
        )
    }
}

ZhiQueEditor.defaultProps = {
    value: '',
    height: 500,
    onChange: undefined,
};

ZhiQueEditor.propTypes = {
    onChange: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.string
};

export default ZhiQueEditor;