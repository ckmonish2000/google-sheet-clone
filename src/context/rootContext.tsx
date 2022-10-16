import React,{ createContext, useState } from "react";
import { IData, IRootContext, IRootContextProvider } from "./types";

export const RootContext = createContext<IRootContext>({
    data:[], 
    setData:(val=[])=>{},
    initRows:{}, 
    setInitRows:({})=>{},
    openMenu:false, 
    setOpenMenu:(v:boolean)=>{},
    addNewElementToRow:()=>{},
    addNewElementToColumn:()=>{}
});

const RootContextProvider:React.FunctionComponent<IRootContextProvider> = ({children})=>{
  const [data, setData] = useState<IData[]>([])
  const [initRows, setInitRows] = useState<IData>({})
  const [openMenu, setOpenMenu] = useState(false)


  const addNewElementToRow = ()=>{
    let currentData:IData[] = [...data];
    currentData.push(initRows)
    setData(currentData)
  }

  const addNewElementToColumn = ()=>{
    const currentKeys = Object.keys(initRows).length
    const rowLength = data.length
    let newRow:IData = {}
    
    for(let i = 0; i < currentKeys+1; i++){
      const key = String.fromCharCode("A".charCodeAt(0)+i)
      newRow[key] = ""
    }
    
    setInitRows(newRow)
    setData(Array(rowLength).fill(newRow))
  }

  return <RootContext.Provider value={{
    data, 
    setData,
    initRows, 
    setInitRows,
    openMenu, 
    setOpenMenu,
    addNewElementToRow,
    addNewElementToColumn
  }}>{children}</RootContext.Provider>
}


export default RootContextProvider