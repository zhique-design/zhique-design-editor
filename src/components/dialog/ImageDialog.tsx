import React, { useEffect, useState } from 'react';

interface ImageDialogProps {
  classPrefix?: string;
  onSelect?: () => void;
  onChange: (values: any) => void;
  selection?: string;
}

const ImageDialog: React.FC<ImageDialogProps> = props => {
  const { classPrefix, onSelect, selection } = props;
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [alt, setAlt] = useState(selection);
  const [link, setLink] = useState('');
  useEffect(() => {
    const { onChange } = props;
    if (onChange) onChange({ url, files, alt, link });
  });
  return (
    <div className={`${classPrefix}-form`}>
      <div className={`${classPrefix}-form-group`}>
        <label>图片地址</label>
        <input
          type="text"
          onChange={e => {
            setUrl(e.target.value);
          }}
          value={url}
          style={{ width: onSelect ? 240 : 325 }}
        />
        {onSelect && (
          <div className={`${classPrefix}-file-input`}>
            <input
              onChange={e => {
                setFiles(e.target.files as any || []);
              }}
              type="file"
              name={`${classPrefix}-image-file`}
              accept="image/*"
            />
            <input type="submit" value="本地上传" />
          </div>
        )}
      </div>
      <div className={`${classPrefix}-form-group`}>
        <label>图片描述</label>
        <input
          type="text"
          value={alt}
          style={{ width: 325 }}
          onChange={e => {
            setAlt(e.target.value);
          }}
        />
      </div>
      <div className={`${classPrefix}-form-group`}>
        <label>图片链接</label>
        <input
          type="text"
          style={{ width: 325 }}
          value={link}
          onChange={e => {
            setLink(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

ImageDialog.defaultProps = {
  classPrefix: 'zhique-md-dialog'
};

export default ImageDialog;
