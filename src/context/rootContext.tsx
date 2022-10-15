import React,{ createContext, useState } from "react";
import { IData, IRootContext, IRootContextProvider } from "./types";

export const RootContext = createContext<IRootContext>({
    data:[], 
    setData:(val=[])=>{},
    initRows:{}, 
    setInitRows:({})=>{}
});

const RootContextProvider:React.FunctionComponent<IRootContextProvider> = ({children})=>{
  const [data, setData] = useState([])
  const [initRows, setInitRows] = useState({})

  return <RootContext.Provider value={{
    data, 
    setData,
    initRows, 
    setInitRows
  }}>{children}</RootContext.Provider>
}


export default RootContextProvider