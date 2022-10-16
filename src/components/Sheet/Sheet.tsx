import React, { useCallback, useContext, useEffect, useState } from 'react'
import { RootContext } from '../../context/rootContext'
import { IData } from '../../context/types'
import Cell from '../Cell'
import Menu from '../Menu'
import { Header, Model, ModelWrap, RowGrid } from './styles'
import { ISheet } from './types'

const Sheet:React.FC<ISheet> = ({noRows,noColumns,})=>{
  const {data,setData,initRows,setInitRows,openMenu,setOpenMenu,addNewElementToRow,addNewElementToColumn} = useContext(RootContext)
  //states for managing cell values
  const [cellValue, setcellValue] = useState<IData>({}) //holds data points for spread sheet
  const [backupCellvalue, setBackupCellvalue] = useState<IData>({})
  //states for sorting
  const [sortColumn, setSortColumn] = useState("")
  const [sortBy, setSortBy] = useState("ASC")

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

  //sort when a column is selected
  useEffect(() => {
    Sort()
  }, [sortColumn,sortBy])
  

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
  
  //function to move datapoints to new column 
  const addColumn = (before:boolean)=>{
      addNewElementToColumn();
      const columnRef = openMenu.charAt(0).toUpperCase()
      const currentCellData = {...cellValue}
      const beforeOrAfter = before ? columnRef.charCodeAt(0) :columnRef.charCodeAt(0)+1
      const getAllKeysAfter = Object.keys(cellValue).filter(v=>v.charCodeAt(0)>=beforeOrAfter).reverse()
      
      getAllKeysAfter.forEach(v=>{
        let newColumnId = v.replace(v.charAt(0),String.fromCharCode(v.charCodeAt(0)+1))
        let currentdata = currentCellData[v]
  
        currentCellData[v] = "null"
        currentCellData[newColumnId] = currentdata
      })
  
    setcellValue(currentCellData)
  }

  //function to move datapoints to new row 
  const addRow = (before:boolean)=>{
    addNewElementToRow();
    const rowRef = openMenu.charAt(1)
    const currentCellData = {...cellValue}
    const beforeOrAfter = before ? (v:string)=>v.charAt(1)>=rowRef :(v:string)=>v.charAt(1)>rowRef
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

  //function to sort table by column
  const Sort = useCallback(()=>{
    setBackupCellvalue(cellValue)
    let newCellValues:{[key:string]:string} = {}
    let arr:{key:string;value:string}[] = []
    const getAllKeys = Object.keys(cellValue).filter(v=>v.charAt(0)===sortColumn)

    getAllKeys.forEach(v=>{
      let obj = {key:v,value:cellValue[v]}
      arr.push(obj)
    })

    
    const sorted = arr.sort((a:any,b:any)=>{
      if(sortBy === "ASC")  return a.value.localeCompare(b.value)
      if(sortBy === "DESC")  return b.value.localeCompare(a.value)
    })

    sorted.forEach((v,index)=>{
      const getAllKeysForIndex = Object.keys(cellValue).filter(v1=>v1.charAt(1)===v.key.charAt(1))
      
      getAllKeysForIndex.forEach(val=>{
        const newId = val.replace(val.charAt(1),`${index+1}`)
        newCellValues[newId] = cellValue[val]
      })

      
      // newCellValues
      setcellValue(newCellValues)
    })

  },[sortColumn,sortBy])

  const onHeaderClick = (key:string)=>{
    if(sortColumn!==key){
      setSortColumn(key)
    }else{
      setSortBy(sortBy==="ASC"?"DESC":"ASC")
    }
    
  }

  return (
    <React.Fragment>
      
    {/* Menu */}
    {openMenu!=="" &&(<Menu addColumn={addColumn} addRow={addRow} openMenu={openMenu} setOpenMenu={setOpenMenu}/>
    // <ModelWrap>
    //   <Model>
    //     <div>
    //     <h1>Menu for {openMenu}</h1>
    //     <button onClick={()=>setOpenMenu("")}>close</button>
    //     </div>

    //     <button onClick={()=>{addColumn(true)}}>Add Column to Before</button>
    //     <button onClick={()=>{addColumn(false)}}>Add Column to After</button>
    //     <button onClick={()=>{addRow(true)}}>Add Row to above</button>
    //     <button onClick={()=>{addRow(false)}}>Add Row to below</button>

    //   </Model>
    // </ModelWrap>
    )}
    
    {/* header */}
    <RowGrid noColumns={columnCount}>
        <div></div>
        {Object.keys(initRows)?.map(key=>(
          <Header 
          colSel={key===sortColumn}
          onClick={()=>onHeaderClick(key)}
          key={key}>{key}</Header>
        ))}
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


  {sortColumn!=="" &&<button onClick={()=>{
    setcellValue(backupCellvalue)
    setBackupCellvalue({})
    setSortColumn("")
  }}>Reset Sort</button>}

    </React.Fragment>
  )
}

export default Sheet