export interface IMenu{
  openMenu:string;
  setOpenMenu:(v:string) =>void;
  addColumn:(v:boolean)=>void;
  addRow:(v:boolean)=>void;
}