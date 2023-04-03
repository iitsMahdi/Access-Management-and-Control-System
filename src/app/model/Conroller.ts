import { Departement } from "./Departement";

export class Contoller{
  id_cont !:bigint;
  nom_controlleur!:String;
  status !:String;
  dept !: Departement; //= new Departement();
}
