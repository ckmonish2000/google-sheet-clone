import React, { useCallback, useContext, useEffect, useState } from 'react'
import { RootContext } from '../../context/rootContext'
import { IData } from '../../context/types'
import Cell from '../Cell'
import { Header, Model, ModelWrap, RowGrid } from './styles'
import { ISheet } from './types'

const Sheet:React.FC<ISheet> = ({noRows,noColumns,})=>{
  const {data,setData,initRows,setInitRows,openMenu,addNewElementToRow,addNewElementToColumn} = useContext(RootContext)
  const [cellValue, setcellValue] = useState<IData>({}) //holds data points for spread sheet

  const columnCount = Object.keys(initRows).length

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

  // function to perform math calculations
  const computeValue = useCallback((val:string)=>{
     // sum function logic
     if(val.slice(0,5)==="=SUM("){
      const valueArray = val.substr(5).slice(0,-1).split(",")
      let expression = "";

      valueArray.forEach((value,idx)=>{
        value = value.toUpperCase()||"";
        if (/^[A-z][0-9]$/g.test(value || "")) {
          expression += cellValue[value] || "0";
          
          if(idx<valueArray.length-1){
            expression += "+"
          }
        }
      })

      try{
        return eval(expression)
      }catch(e){
        console.error(e);
        return "Invalid"
      }
    }

    // logic to calculate expression
    if(val.charAt(0) === '='){
      const valueArray = val.substr(1).split(/([+*-/])/g);

      let expression = "";
      
      valueArray.forEach((value)=>{
        value = value.toUpperCase()||"";
        if (/^[A-z][0-9]$/g.test(value || "")) {
         expression +=  cellValue[value] || "0";
        }else{
          expression += value;
        }

      })

      try{
        return eval(expression)
      }catch(e){
        console.error(e);
        return "Invalid"
      }
    }
   
    return val || ""
  },[cellValue])
  
  const addColumn = (before:boolean)=>{
      addNewElementToColumn();

      const currentCellData = {...cellValue}
      const beforeOrAfter = before ? "B".charCodeAt(0) :"B".charCodeAt(0)+1
      const getAllKeysAfter = Object.keys(cellValue).filter(v=>v.charCodeAt(0)>=beforeOrAfter).reverse()
      
      getAllKeysAfter.forEach(v=>{
        let newColumnId = v.replace(v.charAt(0),String.fromCharCode(v.charCodeAt(0)+1))
        let currentdata = currentCellData[v]
  
        currentCellData[v] = "null"
        currentCellData[newColumnId] = currentdata
      })
  
    setcellValue(currentCellData)
  }

  const addRow = (before:boolean)=>{
    addNewElementToRow();
    
    const currentCellData = {...cellValue}
    const beforeOrAfter = before ? (v:string)=>v.charAt(1)>="2" :(v:string)=>v.charAt(1)>"2"
    const getAllIndexAfter = Object.keys(cellValue).filter(beforeOrAfter).reverse()
    console.log(getAllIndexAfter)
    getAllIndexAfter.forEach(v=>{
      let newColumnId = v.replace(v.charAt(1),eval(v.charAt(1)+"+1"))
      let currentdata = currentCellData[v]

      currentCellData[v] = "null"
      currentCellData[newColumnId] = currentdata
    })

    console.log(currentCellData)
    setcellValue(currentCellData)
  }

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
    <RowGrid noColumns={columnCount}>
        <div></div>
        {Object.keys(initRows)?.map(key=><Header key={key}>{key}</Header>)}
    </RowGrid>
    
    {/* body */}
    {data?.map((val,index)=>(
    <RowGrid key={index} noColumns={columnCount}>
        <Header>{index+1}</Header>
        {/* data map */}
        {Object.keys(initRows)?.map(key=>(
          <Cell 
          key={`${key}${index}`}
          rowIndex={index+1}
          columnIndex={key}
          cellValue={cellValue}
          setcellValue={setcellValue}
          currentValue={cellValue[`${key}${index+1}`] || ""}
          computeValue={computeValue}
          />
        ))}
    </RowGrid>
    ))}
  
  <button onClick={()=>addRow(false)}>add</button>
  <button onClick={()=>addColumn(false)}>Add Column</button>
    </React.Fragment>
  )
}

export default Sheet