import React,{ createContext, useState } from "react";
import { IData, IRootContext, IRootContextProvider } from "./types";

export const RootContext = createContext<IRootContext>({
    data:[], 
    setData:(val=[])=>{},
    initRows:{}, 
    setInitRows:({})=>{},
    openMenu:false, 
    setOpenMenu:(v:boolean)=>{},
});

const RootContextProvider:React.FunctionComponent<IRootContextProvider> = ({children})=>{
  const [data, setData] = useState([])
  const [initRows, setInitRows] = useState({})
  const [openMenu, setOpenMenu] = useState(false)

  return <RootContext.Provider value={{
    data, 
    setData,
    initRows, 
    setInitRows,
    openMenu, 
    setOpenMenu
  }}>{children}</RootContext.Provider>
}


export default RootContextProvider