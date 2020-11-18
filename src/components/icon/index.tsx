import React from 'react';
import classNames from 'classnames';

import '@/assets/icon/iconfont.css';

interface IconProps {
  type: string;
}

const Icon: React.FC<IconProps> = ({ type }) => (
  <i className={classNames('zhique-icon', `zhique-icon-${type}`)} />
);

export default Icon;
