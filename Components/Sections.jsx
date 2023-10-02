import React from 'react'
import classNames from 'classnames'

export default function Sections({children, className, ...props}) {
  const allClassNames = classNames(className)
  return (
    <div className={allClassNames} {...props}>{children}</div>
  )
}
