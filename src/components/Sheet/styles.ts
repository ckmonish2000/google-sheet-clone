import styled from "styled-components";

export const RowGrid = styled.div`
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
  padding:5px
`