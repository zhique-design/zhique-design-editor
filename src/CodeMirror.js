import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/groovy/groovy';

class CodeMirrorEditor extends Component {
    constructor(props) {
        super(props);
        const { value } = this.props;
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

        const { options, height } = this.props;
        const { text } = this.state;

        return (
            <CodeMirror
                value={text}
                options={options}
                onBeforeChange={this.handleBeforeChange}
                onChange={this.handleChange}
                onScroll={this.handleScroll}
                editorDidMount={(editor) => {
                   editor.setSize('100%', height);
                }}
            />
        );
    }


}


CodeMirrorEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    onScroll: PropTypes.func,
    value: PropTypes.string,
};

export default CodeMirrorEditor;