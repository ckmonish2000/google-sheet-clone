import { IData } from "../../context/types";

export interface IInteractiveCell{
  active: boolean;
}

export interface ICell{
  rowIndex:number;
  columnIndex:string;
  currentValue:string;
  cellValue: IData
  setcellValue:(v:IData)=>void;
  computeValue:(val:string)=>string;
}