import React, { useContext, useEffect } from 'react'
import { RootContext } from '../../context/rootContext'
import { IData } from '../../context/types'
import Cell from '../Cell'
import { Header, RowGrid } from './styles'
import { ISheet } from './types'

const Sheet:React.FC<ISheet> = ({noRows,noColumns})=>{
  const {data,setData,initRows,setInitRows} = useContext(RootContext)
  
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
    {/* header */}
    <RowGrid noColumns={noColumns}>
        <div></div>
        {Object.keys(initRows)?.map(key=><Header key={key}>{key}</Header>)}
    </RowGrid>
    
    {/* body */}
    {data?.map((val,index)=>(
    <RowGrid key={index} noColumns={noColumns}>
        <Header>{index+1}</Header>
        {Object.keys(initRows)?.map(key=><Cell key={Math.random()}/>)}
    </RowGrid>
    ))}
  
    </React.Fragment>
  )
}

export default Sheet