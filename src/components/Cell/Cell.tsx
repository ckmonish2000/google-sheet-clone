import React, { useContext, useEffect, useRef, useState } from 'react'
import { RootContext } from '../../context/rootContext'
import { InteractiveCell } from './styles'
import { ICell } from './types'

const Cell:React.FC<ICell> = ({rowIndex,columnIndex,currentValue,cellValue, setcellValue})=> {
  // console.log(rowIndex,columnIndex)
  const {openMenu,setOpenMenu} = useContext(RootContext)
  const inputRef = useRef<HTMLInputElement| null>(null)
  const [edit, setEdit] = useState(false)
  const activate = ()=>setEdit(true)
  const deactivate = ()=>setEdit(false)

  const openMenuNow = (e:MouseEvent)=>{
    e.preventDefault();
    setOpenMenu(true);
  }
  
  //contains logic to open menu
  useEffect(() => {
    inputRef.current?.addEventListener("contextmenu",openMenuNow)

    return ()=>{
      inputRef.current?.removeEventListener("contextmenu",openMenuNow)
    }
  }, [])
  

  return (
    <InteractiveCell
    autoFocus={true}
    active={edit}
    ref={inputRef}
    value={currentValue}
    onChange={(e)=>{
      let curr = {...cellValue}
      curr[`${columnIndex}${rowIndex}`]  = e.target.value
      setcellValue(curr)
    }}
    onFocus={activate}
    onBlur={deactivate}
    />  
  )
}

export default Cell