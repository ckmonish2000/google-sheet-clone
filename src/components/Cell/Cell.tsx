import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { RootContext } from '../../context/rootContext'
import { InteractiveCell } from './styles'
import { ICell } from './types'

const Cell:React.FC<ICell> = ({rowIndex,columnIndex,currentValue,cellValue, setcellValue,computeValue})=> {
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
  
  //memoized value
  const value = useMemo(()=>{
    if(edit){
      return currentValue
    }

    return computeValue(currentValue)
  },[edit,cellValue,setcellValue])

  return (
    <InteractiveCell
    style={{color:value==="null"?"red":""}}
    autoFocus={true}
    active={edit}
    ref={inputRef}
    value={value}
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