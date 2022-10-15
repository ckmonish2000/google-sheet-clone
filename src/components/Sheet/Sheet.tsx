import React, { useContext, useEffect } from 'react'
import { RootContext } from '../../context/rootContext'
import { IData } from '../../context/types'
import { ISheet } from './types'

const Sheet:React.FC<ISheet> = ({noRows,noColumns})=>{
  const {setData,data,setInitRows} = useContext(RootContext)

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
  
  console.log(data)

  return (
    <div>Sheet</div>
  )
}

export default Sheet