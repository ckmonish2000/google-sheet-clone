import React,{ createContext, useState } from "react";
import { IRootContextProvider } from "./types";

export const RootContext = createContext({});

const RootContextProvider:React.FunctionComponent<IRootContextProvider> = ({children})=>{
  const [data, setData] = useState([])
  const [initRows, setInitRows] = useState({})

  const values = {
    data, 
    setData,
    initRows, 
    setInitRows
  }

  return <RootContext.Provider value={values}>{children}</RootContext.Provider>
}


export default RootContextProvider