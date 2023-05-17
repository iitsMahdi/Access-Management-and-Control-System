import { Contoller } from "./Controller";
import { Departement } from "./Departement";
import { Waveshare } from "./Waveshare";

export class Porte{
  IdPorte !:number;
  nomPorte!:String;
  type!:String;
  cntrl!: Contoller;
  numPorte!:any
  wsh!:Waveshare
/*
  constructor(id:bigint){
    this.id_porte=id;
  }
*/
}
