import React from 'react';

export interface IRootContextProvider{
  children:React.ReactNode
}

export interface IData{
  [key:string]:string;
}

export interface IRootContext{
  data:IData[];
  setData:(val:any) => void;
  initRows:IData; 
  setInitRows:(val:IData)=>void;
  openMenu:boolean; 
  setOpenMenu:(v:boolean) => void;
}