import React, { Component } from 'react';
import CodeBlock from '@/components/code-block';
import Markdown from '@/components/markdown';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { observable } from 'mobx';
import CodeMirror from 'codemirror';
import moment from 'moment';
import Dialog, { ImageDialog } from '@/components/dialog';

import Icon from '@/components/icon';

import './index.less';
import { MenuListConfig } from '@/typings/MenuListConfig';
import LinkDialog from '@/components/dialog/LinkDialog';
import ReferenceLinkDialog from '@/components/dialog/ReferenceLinkDialog';
import GotoLineDialog from '@/components/dialog/GotoLineDialog';
import TableDialog from '@/components/dialog/TableDialog';

interface MarkdownEditorProps {
  value?: string;
  width?: string | number;
  height?: string | number;
  classPrefix?: string;
  watch?: boolean;
  fullScreen?: boolean;
  menuList?: (cm?: CodeMirror) => MenuListConfig;
  dateFormat?: string;
  onChange?: (value?: string) => void;
}

interface EditorUIProps {
  width: string | number;
  height: string | number;
  toolBarHeight?: number;
  watch?: boolean;
  masking?: boolean;
  fullScreen?: boolean;

}

@observer
export default class MarkdownEditor extends Component<MarkdownEditorProps> {

  static defaultProps = {
    width: '90%',
    height: 500,
    classPrefix: 'zhique-md',
    watch: true,
    dateFormat: 'YYYY年MM月DD日 dddd'
  };

  @observable text?: string;

  @observable editorUIProps: EditorUIProps;

  editor: HTMLDivElement | null = null;

  toolbar: HTMLDivElement | null = null;

  previewBlock: HTMLDivElement | null = null;

  codeBlock: CodeBlock | null = null;

  dialogContainer: HTMLDivElement | null = null;

  constructor(props) {
    super(props);
    const { value, width, height, watch, fullScreen } = props;
    this.text = value;
    this.editorUIProps = {
      width,
      height,
      watch,
      fullScreen,
    };
  }

  componentDidMount() {
    if (this.toolbar) {
      this.editorUIProps.toolBarHeight = this.toolbar.clientHeight;
    }
  }

  get menuList(): MenuListConfig {
    const { menuList } = this.props;
    const cm = this.codeBlock?.cm;
    const { watch, fullScreen } = this.editorUIProps;
    const defaultMenuList: MenuListConfig = [
      {
        title: '撤销（Ctrl+Z）',
        icon: 'undo',
        onClick: () => {
          cm.focus();
          cm.undo();
        },
      },
      {
        title: '重做（Ctrl+Y）',
        icon: 'redo',
        onClick: () => {
          cm.focus();
          cm.redo();
        },
      },
      '|',
      {
        title: '粗体',
        icon: 'bold',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          cm.replaceSelection(`**${selection}**`);
          if (selection === '') {
            cm.setCursor(cursor.line, cursor.ch + 2);
          }
        },
      },
      {
        title: '删除线',
        icon: 'strikethrough',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          cm.replaceSelection(`~~${selection}~~`);

          if (selection === '') {
            cm.setCursor(cursor.line, cursor.ch + 2);
          }
        },
      },
      {
        title: '斜体',
        icon: 'italic',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          cm.replaceSelection(`*${selection}*`);
          if (selection === '') {
            cm.setCursor(cursor.line, cursor.ch + 1);
          }
        },
      },
      {
        title: '引用',
        icon: 'quote-left',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`> ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 2);
          } else {
            cm.replaceSelection(`> ${selection}`);
          }
        },
      },
      {
        title: '将每个单词首字母转成大写',
        text: 'Aa',
        onClick: () => {
          cm.focus();
          const selection = cm.getSelection();
          const selections = cm.listSelections();
          cm.replaceSelection(
            selection.toLowerCase().replace(/\b(\w)|\s(\w)/g, (char) => {
              return char.toUpperCase();
            })
          );
          cm.setSelections(selections);
        },
      },
      {
        title: '将所选转换成大写',
        text: 'A',
        onClick: () => {
          cm.focus();
          const selection = cm.getSelection();
          const selections = cm.listSelections();
          cm.replaceSelection(selection.toUpperCase());
          cm.setSelections(selections);
        },
      },
      {
        title: '将所选转换成小写',
        text: 'a',
        onClick: () => {
          cm.focus();
          const selection = cm.getSelection();
          const selections = cm.listSelections();
          cm.replaceSelection(selection.toLowerCase());
          cm.setSelections(selections);
        },
      },
      '|',
      {
        title: '标题1',
        text: 'h1',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`# ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 2);
          } else {
            cm.replaceSelection(`# ${selection}`);
          }
        },
      },
      {
        title: '标题2',
        text: 'h2',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`## ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 3);
          } else {
            cm.replaceSelection(`## ${selection}`);
          }
        },
      },
      {
        title: '标题3',
        text: 'h3',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`### ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 4);
          } else {
            cm.replaceSelection(`### ${selection}`);
          }
        },
      },
      {
        title: '标题4',
        text: 'h4',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`#### ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 5);
          } else {
            cm.replaceSelection(`#### ${selection}`);
          }
        },
      },
      {
        title: '标题5',
        text: 'h5',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`##### ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 6);
          } else {
            cm.replaceSelection(`##### ${selection}`);
          }
        },
      },
      {
        title: '标题6',
        text: 'h6',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          if (cursor.ch !== 0) {
            cm.setCursor(cursor.line, 0);
            cm.replaceSelection(`###### ${selection}`);
            cm.setCursor(cursor.line, cursor.ch + 7);
          } else {
            cm.replaceSelection(`###### ${selection}`);
          }
        },
      },
      '|',
      {
        title: '无序列表',
        icon: 'unorderedlist',
        onClick: () => {
          cm.focus();
          const selection = cm.getSelection();
          if (selection === '') {
            cm.replaceSelection(`- ${selection}`);
          } else {
            let selectionText = selection.split('\n');
            selectionText = selectionText.map((item) =>
              item === '' ? '' : `- ${item}`
            );
            cm.replaceSelection(selectionText.join('\n'));
          }
        },
      },
      {
        title: '有序列表',
        icon: 'orderedlist',
        onClick: () => {
          cm.focus();
          const selection = cm.getSelection();
          if (selection === '') {
            cm.replaceSelection(`1. ${selection}`);
          } else {
            let selectionText = selection.split('\n');
            selectionText = selectionText.map((item, index) =>
              item === '' ? '' : `${index + 1}. ${item}`
            );
            cm.replaceSelection(selectionText.join('\n'));
          }
        },
      },
      {
        title: '横线',
        icon: 'minus',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          cm.replaceSelection(
            `${cursor.ch !== 0 ? '\n\n' : '\n'}------------\n\n`
          );
        },
      },
      '|',
      {
        title: '链接',
        icon: 'link',
        onClick: () => {
          this.editorUIProps.masking = true;
          let data: any = {};
          const selection = cm.getSelection();
          if (this.editor && this.dialogContainer) {
            const dialog = Dialog.show({
              children: (
                <LinkDialog
                  onChange={values => { data = values; }}
                  selection={selection}
                />
              ),
              container: this.dialogContainer,
              editor: this.editor,
              width: 380,
              title: '添加链接',
              footer: [
                {
                  text: '确定',
                  type: 'enter',
                  onClick: () => {
                    const { title, url } = data;
                    let str = '';
                    if (title && title !=='') {
                      str = `[${title !== '' ? title : url}](${url} "${title}")`;
                    } else {
                      str = `[${url}](${url})`;
                    }
                    cm.replaceSelection(str);
                    this.destroyDialog(dialog);
                  }
                },
                {
                  text: '取消',
                  type: 'cancel',
                  onClick: () => {
                    this.destroyDialog(dialog);
                  }
                }
              ]
            });
          }
        },
      },
      {
        title: '引用链接',
        icon: 'anchor',
        onClick: () => {
          this.editorUIProps.masking = true;
          let data: any = {};
          const selection = cm.getSelection();
          if (this.editor && this.dialogContainer) {
            const dialog = Dialog.show({
              children: (
                <ReferenceLinkDialog
                  onChange={values => { data = values; }}
                  selection={selection}
                />
              ),
              container: this.dialogContainer,
              editor: this.editor,
              width: 380,
              title: '添加引用链接',
              footer: [
                {
                  text: '确定',
                  type: 'enter',
                  onClick: () => {
                    const { name, id, title, url } = data;
                    const cursor = cm.getCursor();
                    cm.replaceSelection(`[${name}][${id}]`);
                    if (selection === '') {
                      cm.setCursor(cursor.line, cursor.ch + 1);
                    }
                    cm.setValue(`${cm.getValue()}\n\n[${id}]: ${url} ${title === '' ? '' : `"${title}"`}`);
                    this.destroyDialog(dialog);
                  }
                },
                {
                  text: '取消',
                  type: 'cancel',
                  onClick: () => {
                    this.destroyDialog(dialog);
                  }
                }
              ]
            });
          }
        },
      },
      {
        title: '添加图片',
        icon: 'image',
        onClick: () => {
          this.editorUIProps.masking = true;
          let data: any = {};
          const selection = cm.getSelection();
          if (this.editor && this.dialogContainer) {
            const dialog = Dialog.show({
              children: (
                <ImageDialog
                  onChange={values => { data = values; }}
                  selection={selection}
                />
              ),
              container: this.dialogContainer,
              editor: this.editor,
              width: 465,
              title: '添加图片',
              footer: [
                {
                  text: '确定',
                  type: 'enter',
                  onClick: () => {
                    const { link, alt, url } = data;
                    const altAttr = alt !== '' ? `"${alt}"` : '';
                    const cursor = cm.getCursor();
                    if (link === '' || link === 'http://') {
                      cm.replaceSelection(`![${alt}](${url})`);
                    } else {
                      cm.replaceSelection(`[![${alt}](${url} ${altAttr})](${link} ${altAttr})`);
                    }
                    if (alt === '') {
                      cm.setCursor(cursor.line, cursor.ch + 2);
                    }
                    this.destroyDialog(dialog);
                  }
                },
                {
                  text: '取消',
                  type: 'cancel',
                  onClick: () => {
                    this.destroyDialog(dialog);
                  }
                }
              ]
            });
          }
        },
      },
      {
        title: '行内代码',
        icon: 'code',
        onClick: () => {
          cm.focus();
          const cursor = cm.getCursor();
          const selection = cm.getSelection();
          cm.replaceSelection(`\`${selection}\``);
          if (selection === '') {
            cm.setCursor(cursor.line, cursor.ch + 1);
          }
        },
      },
      {
        title: '表格',
        icon: 'table',
        onClick: () => {
          this.editorUIProps.masking = true;
          let data: any = {};
          if (this.editor && this.dialogContainer) {
            const dialog = Dialog.show({
              children: (
                <TableDialog
                  onChange={values => { data = values; }}
                />
              ),
              container: this.dialogContainer,
              editor: this.editor,
              width: 400,
              title: '表格',
              footer: [
                {
                  text: '确定',
                  type: 'enter',
                  onClick: () => {
                    const { rows, cols, align } = data;
                    let table = '';
                    const hrLine = '------------';
                    const alignSign = {
                      default: hrLine,
                      left: `:${hrLine}`,
                      center: `:${hrLine}:`,
                      right: `${hrLine}:`
                    };
                    if (rows > 1 && cols > 0) {
                      for (let r = 0, len = rows; r < len; r += 1) {
                        const row: Array<string> = [];
                        const head: Array<string> = [];
                        for (let c = 0, len2 = cols; c < len2; c += 1) {
                          if (r === 1) {
                            head.push(alignSign[align]);
                          }
                          row.push(' ');
                        }
                        if (r === 1) {
                          table += `| ${head.join(' | ')} |\n`;
                        }
                        table += `| ${row.join(cols === 1 ? '' : ' | ')} |\n`;
                      }
                    }
                    cm.replaceSelection(table);
                    this.destroyDialog(dialog);
                  }
                },
                {
                  text: '取消',
                  type: 'cancel',
                  onClick: () => {
                    this.destroyDialog(dialog);
                  }
                }
              ]
            });
          }
        },
      },
      {
        title: '日期时间',
        icon: 'time-circle',
        onClick: () => {
          const { dateFormat } = this.props;
          cm.focus();
          moment.locale(navigator.language);
          cm.replaceSelection(moment().format(dateFormat));
        }
      },
      '|',
      {
        title: '跳转到行',
        icon: 'terminal',
        onClick: () => {
          this.editorUIProps.masking = true;
          let data: any = {};
          if (this.editor && this.dialogContainer) {
            const dialog = Dialog.show({
              children: (
                <GotoLineDialog
                  onChange={values => { data = values; }}
                  lineCount={cm.lineCount()}
                />
              ),
              container: this.dialogContainer,
              editor: this.editor,
              width: 400,
              title: '跳转到行',
              footer: [
                {
                  text: '确定',
                  type: 'enter',
                  onClick: () => {
                    const { line } = data;
                    cm.setCursor({ line: line - 1, ch: 0 });
                    const scrollInfo = cm.getScrollInfo();
                    const {clientHeight} = scrollInfo;
                    const coords = cm.charCoords({ line: line - 1, ch: 0 }, 'local');
                    cm.scrollTo(null, (coords.top + coords.bottom - clientHeight) / 2);
                    const {
                      clientHeight: height,
                      scrollTop,
                      scrollHeight
                    } = this.codeBlock?.cm?.display.scroller;
                    const percent = scrollTop / scrollHeight;
                    this.previewBlockSyncScroll(scrollTop, scrollHeight, height, percent);
                    this.destroyDialog(dialog);
                  }
                },
                {
                  text: '取消',
                  type: 'cancel',
                  onClick: () => {
                    this.destroyDialog(dialog);
                  }
                }
              ]
            });
          }
        },
      },
      '|',
      {
        title: fullScreen ? '退出全屏' : '全屏（按ESC还原）',
        icon: `fullscreen${fullScreen ? '-exit' : ''}`,
        onClick: () => {
          this.editorUIProps.fullScreen = !fullScreen;
        },
      },
      {
        title: `${watch ? '关闭' : '开启'}实时预览`,
        icon: `eye${watch ? '-close' : ''}`,
        onClick: () => {
          this.editorUIProps.watch = !watch;
        },
      },
    ];
    if (menuList) return [...defaultMenuList, ...menuList(cm)];
    return defaultMenuList;
  }

  previewBlockSyncScroll = (top, scrollHeight, height, percent) => {
    const { watch } = this.editorUIProps;
    if (watch) {
      if (top === 0) {
        this.previewBlock?.scrollTo({ top: 0 });
      } else if (top + height >= scrollHeight - 16) {
        this.previewBlock?.scrollTo({ top: this.previewBlock?.scrollHeight });
      } else {
        this.previewBlock?.scrollTo({
          top: this.previewBlock?.scrollHeight * percent,
        });
      }
    }
  };

  codeBlockSyncScroll = () => {
    if (this.previewBlock) {
      const { clientHeight: height, scrollTop, scrollHeight } = this.previewBlock;
      const percent = scrollTop / scrollHeight;
      const codeScroller = this.codeBlock?.cm?.display.scroller;
      if (codeScroller) {
        if (scrollTop === 0) {
          codeScroller.scrollTop = 0;
        } else if (scrollTop + height >= scrollHeight) {
          codeScroller.scrollTop = codeScroller.scrollHeight;
        } else {
          codeScroller.scrollTop = codeScroller.scrollHeight * percent;
        }
      }
    }
  };

  bindSyncScroll = () => {
    this.previewBlock?.addEventListener('scroll', this.codeBlockSyncScroll);
  };

  unbindSyncScroll = () => {
    this.previewBlock?.removeEventListener('scroll', this.codeBlockSyncScroll);
  };

  destroyDialog = (dialog) => {
    if (this.codeBlock?.cm) {
      this.codeBlock?.cm.focus();
    }
    dialog.destroy();
    this.editorUIProps.masking = false;
  };

  initToolbar = () => {
    const { classPrefix } = this.props;
    return (
      <ul className={`${classPrefix}-editor-menu`}>
        {this.menuList?.map((item, index) => {
          if (item === '|') {
            return (
              <li className={classNames('"menu-item', 'divider')} key={`menu-item-${index}`} />
            );
          }
          const { title, icon, onClick, text } = item;
          return (
            <li key={`menu-item-${index}`} onClick={onClick} title={title}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="menu-item">
                {icon ? <Icon type={icon} /> : text}
              </a>
            </li>
          );

        })}
      </ul>
    );
  };

  render() {
    const { classPrefix } = this.props;
    const {
      width,
      height,
      watch,
      masking,
      fullScreen,
      toolBarHeight,
    } = this.editorUIProps;
    return (
      <div
        style={{
          width: fullScreen ? window.innerWidth : width,
          height: fullScreen
            ? toolBarHeight
              ? window.innerHeight - toolBarHeight
              : window.innerHeight
            : height,
          paddingTop: toolBarHeight,
        }}
        className={classNames(
          `${classPrefix}-editor`,
          fullScreen ? `${classPrefix}-editor-fullscreen` : ''
        )}
        ref={node => { this.editor = node; }}
      >
        <CodeBlock
          value={this.text}
          onChange={(value) => {
            this.text = value;
            const { onChange } = this.props;
            if (onChange) onChange(value);
          }}
          onCmScroll={this.previewBlockSyncScroll}
          options={{
            mode: 'gfm',
          }}
          ref={(node) => {
            this.codeBlock = node;
          }}
        />
        {watch && (
          <div
            style={{ width: '50%', height: '100%' }}
            className={`${classPrefix}-preview`}
            ref={(node) => {
              this.previewBlock = node;
            }}
            onMouseOver={this.bindSyncScroll}
            onFocus={() => undefined}
            onTouchStart={this.bindSyncScroll}
            onMouseOut={this.unbindSyncScroll}
            onBlur={() => undefined}
            onTouchEnd={this.unbindSyncScroll}
          >
            <div
              className={classNames(
                'markdown-body',
                `${classPrefix}-preview-container`
              )}
            >
              <Markdown value={this.text} />
            </div>
          </div>
        )}
        <div className={classNames(`${classPrefix}-mask`, masking ? 'show-mask' : '')} />
        <div
          className={`${classPrefix}-toolbar`}
          ref={(node) => {
            this.toolbar = node;
          }}
        >
          <div className={`${classPrefix}-toolbar-container`}>
            {this.initToolbar()}
          </div>
        </div>
        <div
          className={`${classPrefix}-dialog`}
          ref={node => { this.dialogContainer = node; }}
        />
      </div>
    );
  }
}
