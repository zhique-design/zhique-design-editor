import React, { useEffect, useState } from 'react';
import Icon from '../icon';

interface TableDialogProps {
  classPrefix?: string;
  onChange: (values: any) => void;
}

const ALIGIN_TYPE_LIST = [
  {
    icon: 'align-left',
    label: '左对齐',
    value: 'left'
  },
  {
    icon: 'align-center',
    label: '居中对齐',
    value: 'center'
  },
  {
    icon: 'align-right',
    label: '右对齐',
    value: 'right'
  },
];

const TableDialog: React.FC<TableDialogProps> = props => {
  const { classPrefix } = props;
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(2);
  const [align, setAlign] = useState('left');
  useEffect(() => {
    const { onChange } = props;
    onChange({ rows, cols, align });
  });
  return (
    <div className={`${classPrefix}-form`}>
      <div className={`${classPrefix}-form-group`}>
        <label>行数</label>
        <input
          type="number"
          className="number-input"
          min={2}
          max={100}
          value={rows}
          style={{ width: 40 }}
          onChange={e => {
            setRows(Number(e.target.value));
          }}
        />
        <label>列数</label>
        <input
          type="number"
          className="number-input"
          value={cols}
          style={{ width: 40 }}
          max={100}
          min={1}
          onChange={e => {
            setCols(Number(e.target.value));
          }}
        />
      </div>
      <div className={`${classPrefix}-form-group`}>
        <label>对齐方式</label>
        <div className="align-type-list">
          {ALIGIN_TYPE_LIST.map(({ icon, label, value }, index) => (
            <a>
              <label htmlFor={`${classPrefix}-radio${index}`} title={label}>
                <input
                  type="radio"
                  name="table-align"
                  id={`${classPrefix}-radio${index}`}
                  value={value}
                  defaultChecked={index === 0 ? true : undefined}
                  onChange={e => {
                    setAlign(e.target.value);
                  }}
                />
                <Icon type={icon} />
              </label>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

TableDialog.defaultProps = {
  classPrefix: 'zhique-md-dialog'
};

export default TableDialog;
