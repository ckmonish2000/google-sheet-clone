import styled from "styled-components";
import { IInteractiveCell } from "./types";


export const InteractiveCell = styled.input<IInteractiveCell>`
  border:${({active}:IInteractiveCell)=>active?"2px solid blue":""};
  width:90px;
`