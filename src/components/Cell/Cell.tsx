import React, { useState } from 'react'
import { InteractiveCell } from './styles'

function Cell() {
  const [edit, setEdit] = useState(false)
  const activate = ()=>setEdit(true)
  const deactivate = ()=>setEdit(true)

  return (
    <InteractiveCell
    active={edit}
    onFocus={activate}
    onBlur={deactivate}
    />  
  )
}

export default Cell