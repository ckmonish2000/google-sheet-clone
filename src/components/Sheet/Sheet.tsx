import React, { useContext, useEffect } from 'react'
import { RootContext } from '../../context/rootContext'
import { IData } from '../../context/types'
import Cell from '../Cell'
import { Header, Model, ModelWrap, RowGrid } from './styles'
import { ISheet } from './types'

const Sheet:React.FC<ISheet> = ({noRows,noColumns})=>{
  const {data,setData,initRows,setInitRows,openMenu} = useContext(RootContext)
  
  // This function populates the table with rows and column 
  useEffect(() => {
    let initRows:IData = {}
    
    for(let i = 0; i < noColumns; i++){
      const key = String.fromCharCode("A".charCodeAt(0)+i)
      initRows[key] = ""
    }

    const column = Array(noRows).fill(initRows)

    setInitRows(initRows)
    setData(column)
  }, [])

  return (
    <React.Fragment>
      
    {/* Menu */}
    {openMenu &&(
    <ModelWrap>
      <Model>
        <h1>Menu</h1>
      </Model>
    </ModelWrap>
    )}
    
    {/* header */}
    <RowGrid noColumns={noColumns}>
        <div></div>
        {Object.keys(initRows)?.map(key=><Header key={key}>{key}</Header>)}
    </RowGrid>
    
    {/* body */}
    {data?.map((val,index)=>(
    <RowGrid key={index} noColumns={noColumns}>
        <Header>{index+1}</Header>
        {/* data map */}
        {Object.keys(initRows)?.map(key=>(
          <Cell 
          key={Math.random()}
          rowIndex={index}
          columnIndex={key}
          />
        ))}
    </RowGrid>
    ))}
  
    </React.Fragment>
  )
}

export default Sheet