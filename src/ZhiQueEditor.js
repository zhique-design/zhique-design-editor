import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import MarkDown from 'react-markdown';
import FreeScrollBar from 'react-free-scrollbar';

import CodeBlock from './CodeBlock';
import CodeMirrorEditor from './CodeMirror';

import './ZhiQueEditor.css';


class ZhiQueEditor extends Component {

    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            text: value || '',
        };
    }

    handleChange = value => {
        this.setState({
            text: value || ''
        });
        const { onChange } = this.props;
        if (onChange) onChange(value)
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
                                <CodeMirrorEditor
                                    options={{
                                        mode: 'gfm',
                                        theme: 'material',
                                        lineNumbers: true,
                                        autofocus: true,
                                        scrollbarStyle: null
                                    }}
                                    height={height}
                                    onChange={this.handleChange}
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