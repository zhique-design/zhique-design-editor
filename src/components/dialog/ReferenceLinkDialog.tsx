import React, { useEffect, useState } from 'react';

interface ReferenceLinkDialogProps {
  classPrefix?: string;
  onChange: (values: any) => void;
  selection?: string;
}

const ReferenceLinkDialog: React.FC<ReferenceLinkDialogProps> = props => {
  const { classPrefix, selection } = props;
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState(selection);
  useEffect(() => {
    const { onChange } = props;
    if (onChange) onChange({ name, id, url, title });
  });
  return (
    <div className={`${classPrefix}-form`}>
      <div className={`${classPrefix}-form-group`}>
        <label>引用名称</label>
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={`${classPrefix}-form-group`}>
        <label>链接ID</label>
        <input
          type="text"
          value={id}
          onChange={e => {
            setId(e.target.value);
          }}
        />
      </div>
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

ReferenceLinkDialog.defaultProps = {
  classPrefix: 'zhique-md-dialog'
};

export default ReferenceLinkDialog;
