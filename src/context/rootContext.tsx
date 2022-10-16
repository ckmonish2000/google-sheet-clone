import React,{ createContext, useState } from "react";
import { IData, IRootContext, IRootContextProvider } from "./types";

export const RootContext = createContext<IRootContext>({
    data:[], 
    setData:(val=[])=>{},
    initRows:{}, 
    setInitRows:({})=>{},
    openMenu:false, 
    setOpenMenu:(v:boolean)=>{},
    addNewRow:()=>{},
    addNewColumn:()=>{}
});

const RootContextProvider:React.FunctionComponent<IRootContextProvider> = ({children})=>{
  const [data, setData] = useState<IData[]>([])
  const [initRows, setInitRows] = useState<IData>({})
  const [openMenu, setOpenMenu] = useState(false)


  const addNewRow = ()=>{
    let currentData:IData[] = [...data];
    currentData.push(initRows)
    setData(currentData)
  }

  const addNewColumn = ()=>{
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
    addNewRow,
    addNewColumn
  }}>{children}</RootContext.Provider>
}


export default RootContextProvider