import { Departement } from "./Departement";
import { Profile } from "./Profile";

export class Visiteur{
  id!:bigint;
  adresse!:String;
  code!:String;
  email !:String;
  image!:String;
  phone !:String;
  role !:String;
  firstname !:String;
  lastname !:String;
  prof: Profile | null = null;
  depar: Departement | null = null;
  codePin!:any
  codeUid!:any
}
