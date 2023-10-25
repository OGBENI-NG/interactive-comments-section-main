import React from 'react';
import classNames from 'classnames';

const Sections = React.memo(({ children, className, ...props }) => {
  const allClassNames = classNames(className);
  return <div className={allClassNames} {...props}>{children}</div>;
});

export default Sections;
