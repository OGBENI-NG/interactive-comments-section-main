import React from 'react'

export default function Sections({children, ...props}) {
  return (
    <div {...props}>{children}</div>
  )
}
