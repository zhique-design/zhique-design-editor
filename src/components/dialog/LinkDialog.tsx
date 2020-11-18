import React, { useEffect, useState } from 'react';

interface LinkDialogProps {
  classPrefix?: string;
  onChange: (values: any) => void;
  selection?: string;
}

const LinkDialog: React.FC<LinkDialogProps> = props => {
  const { classPrefix, selection } = props;
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState(selection);
  useEffect(() => {
    const { onChange } = props;
    if (onChange) onChange({ url, title });
  });
  return (
    <div className={`${classPrefix}-form`}>
      <div className={`${classPrefix}-form-group`}>
        <label>链接地址</label>
        <input
          type="text"
          value={url}
          onChange={e => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <div className={`${classPrefix}-form-group`}>
        <label>链接标题</label>
        <input
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

LinkDialog.defaultProps = {
  classPrefix: 'zhique-md-dialog'
};

export default LinkDialog;
