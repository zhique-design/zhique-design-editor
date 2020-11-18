import React, { Children, ReactNode, cloneElement } from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import ImageDialog from './ImageDialog';
import './index.less';

interface FooterProps {
  text: string;
  type: string;
  onClick: () => void;
}

interface DialogProps {
  container: HTMLDivElement;
  width: string | number;
  editor: HTMLDivElement;
  title?: ReactNode;
  children: ReactNode;
  footer?: Array<FooterProps>;
}

function show(props: DialogProps) {
  const {
    container,
    width,
    editor,
    title,
    footer,
    children
  } = props;
  const classPrefix = 'zhique-md-dialog';
  const dialog = document.createElement('div');
  container.append(dialog);
  ReactDom.render((
    <>
      {title && (
        <div className={`${classPrefix}-header`}>
          <strong>{title}</strong>
        </div>
      )}
      <div className={`fa ${classPrefix}-content`}>
        {Children.map(children, (child: any) => cloneElement(child, {
          classPrefix
        }))}
      </div>
      {footer && (
        <div className={`${classPrefix}-footer`}>
          {footer.map(({ text, type='default', onClick }) => (
            <button
              type="button"
              key={text}
              className={classNames(`${classPrefix}-btn`, `${classPrefix}-${type}-btn`)}
              onClick={onClick}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </>
  ),
    dialog,
    () => {
      container.style.display = 'block';
      container.style.width = typeof width === 'number' ? `${width}px` : width;
      container.style.top = `${(editor.clientHeight - container.clientHeight) / 2}px`;
      container.style.left = `${(editor.clientWidth - container.clientWidth) / 2}px`;
    });
  return {
    destroy: () => {
      container.removeChild(dialog);
      container.style.display = 'none';
    }
  };
}

export default { show };

export { ImageDialog };
