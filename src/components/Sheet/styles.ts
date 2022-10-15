import styled from "styled-components";
import { IRowGrid } from "./types";

export const RowGrid = styled.div<IRowGrid>`
  display: grid;
  grid-template-columns: 32px repeat(${props=>props.noColumns},90px);
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  color: grey;
  border: 1px solid;
  font-weight: 600;
  padding:5px;
`

export const ModelWrap = styled.div`
    position: absolute;
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