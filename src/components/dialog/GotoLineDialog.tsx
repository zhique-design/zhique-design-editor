import React, { useEffect, useState } from 'react';

interface GotoLineDialogProps {
  classPrefix?: string;
  onChange: (values: any) => void;
  lineCount: number;
}

const GotoLineDialog: React.FC<GotoLineDialogProps> = props => {
  const { classPrefix, lineCount } = props;
  const [line, setLine] = useState(lineCount);
  useEffect(() => {
    const { onChange } = props;
    onChange({ line });
  });
  return (
    <div className={`${classPrefix}-form`}>
      <div className={`${classPrefix}-form-group`}>
        <label style={{ width: 120 }}>
          {`请输入行号 1-${lineCount}`}
        </label>
        <input
          style={{ width: 190 }}
          type="number"
          value={line}
          onChange={e => {
            setLine(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

GotoLineDialog.defaultProps = {
  classPrefix: 'zhique-md-dialog'
};

export default GotoLineDialog;
