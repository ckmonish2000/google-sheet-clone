import React from 'react'
import { CloseBtn, MenuBtn, Model, ModelWrap, RowBetween } from './styles'
import { IMenu } from './types'

const Menu:React.FC<IMenu> = ({openMenu,setOpenMenu,addColumn,addRow}) =>{
  const closeNow = ()=>setOpenMenu("")
  
  const addColumnAndClose = (val:boolean)=>{
    addColumn(val)
    closeNow()
  }

  const addRowAndClose = (val:boolean)=>{
    addRow(val)
    closeNow()
  }

  return (
    <ModelWrap>
    <Model>
      <RowBetween>
      <h1>Menu for {openMenu}</h1>
      <CloseBtn onClick={closeNow}>close</CloseBtn>
      </RowBetween>

      <MenuBtn onClick={()=>{addColumnAndClose(true)}}>Add Column to Before</MenuBtn>
      <MenuBtn onClick={()=>{addColumnAndClose(false)}}>Add Column to After</MenuBtn>
      <MenuBtn onClick={()=>{addRowAndClose(true)}}>Add Row to above</MenuBtn>
      <MenuBtn onClick={()=>{addRowAndClose(false)}}>Add Row to below</MenuBtn>

    </Model>
  </ModelWrap>
  )
}

export default Menu