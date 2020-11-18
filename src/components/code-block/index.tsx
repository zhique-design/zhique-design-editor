import React, { Component } from 'react';
import CodeMirror, { EditorConfiguration } from 'codemirror';

const defaultCodeMirrorOptions: EditorConfiguration = {
  lineNumbers: true,
  lineWrapping: true,
};

interface CodeBlockProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
    > {
  options?: EditorConfiguration;
  value?: string;
  onChange?: (value: any) => void;
  onCmScroll: (
    scrollTop: number,
    scrollHeight: number,
    height: number,
    percent: number
  ) => void;
}

export default class CodeBlock extends Component<CodeBlockProps> {
  text: string;

  codeBlock: HTMLTextAreaElement | null = null;

  cm: CodeMirror | null = null;

  constructor(props) {
    super(props);
    const { value } = props;
    this.text = value;
  }

  componentDidMount() {
    this.cm = CodeMirror.fromTextArea(this.codeBlock, this.cmOptions);
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  get cmOptions(): EditorConfiguration {
    const { options } = this.props;
    return { ...defaultCodeMirrorOptions, ...options };
  }

  addEventListeners = () => {
    const {
      display: { wrapper, scroller },
    } = this.cm;
    this.cm.on('change', this.handleChange);
    wrapper.addEventListener('mouseover', () => this.cmBindScroll(scroller));
    wrapper.addEventListener('touchstart', () => this.cmBindScroll(scroller));
    wrapper.addEventListener('mouseout', () => this.cmUnBindScroll(scroller));
    wrapper.addEventListener('touchend', () => this.cmUnBindScroll(scroller));
  };

  removeEventListeners = () => {
    const { wrapper, scroller } = this.cm;
    this.cm.un('change', this.handleChange);
    wrapper.removeEventListener('mouseover', () => this.cmBindScroll(scroller));
    wrapper.removeEventListener('touchstart', () =>
      this.cmBindScroll(scroller)
    );
    wrapper.removeEventListener('mouseout', () =>
      this.cmUnBindScroll(scroller)
    );
    wrapper.removeEventListener('touchend', () =>
      this.cmUnBindScroll(scroller)
    );
  };

  cmBindScroll = (scroller) => {
    scroller.addEventListener('scroll', this.cmScroll);
  };

  cmUnBindScroll = (scroller) => {
    scroller.removeEventListener('scroll', this.cmScroll);
  };

  cmScroll = (e) => {
    const { clientHeight: height, scrollTop, scrollHeight } = e.currentTarget;
    const percent = scrollTop / scrollHeight;
    const { onCmScroll } = this.props;
    if (onCmScroll) onCmScroll(scrollTop, scrollHeight, height, percent);
  };

  handleChange = (cm) => {
    const { onChange } = this.props;
    this.text = cm.getValue();
    if (onChange) onChange(this.text);
  };

  render() {
    return (
      <textarea
        ref={(node) => {
          this.codeBlock = node;
        }}
        defaultValue={this.text}
      />
    );
  }
}
