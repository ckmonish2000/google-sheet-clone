import React from 'react'
import { Model, ModelWrap } from './styles'
import { IMenu } from './types'

const Menu:React.FC<IMenu> = ({openMenu,setOpenMenu,addColumn,addRow}) =>{
  return (
    <ModelWrap>
    <Model>
      <div>
      <h1>Menu for {openMenu}</h1>
      <button onClick={()=>setOpenMenu("")}>close</button>
      </div>

      <button onClick={()=>{addColumn(true)}}>Add Column to Before</button>
      <button onClick={()=>{addColumn(false)}}>Add Column to After</button>
      <button onClick={()=>{addRow(true)}}>Add Row to above</button>
      <button onClick={()=>{addRow(false)}}>Add Row to below</button>

    </Model>
  </ModelWrap>
  )
}

export default Menu