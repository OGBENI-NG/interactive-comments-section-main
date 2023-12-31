import React from 'react';
import classNames from 'classnames';

const Sections = React.memo(({ children, className, ...props }) => {
  const allClassNames = classNames(className);
  return <section className={allClassNames} {...props}>{children}</section>;
});

export default Sections;
