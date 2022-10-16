import styled from "styled-components";

export const ModelWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Model = styled.div`
    width: 50%;
    height: 50%;
    background: white;
    border-radius: 10px;
    padding:10px;
`

export const RowBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`

export const MenuBtn = styled.button`
    width: 100%;
    margin: 5px auto;
    padding: 10px 5px;
    border-radius: 4px;
    outline: none;
    border: 0px;
    box-shadow: 0px 0px 2px;
    cursor: pointer;
    
    :hover{
      font-weight: bold;
    }
`

export const CloseBtn = styled.button`
    padding: 6px;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.1);
    cursor: pointer;

    :hover{
      font-weight: 600;
      color: red;
    }
`