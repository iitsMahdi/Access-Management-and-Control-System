import { Departement } from "./Departement";
import { Profile } from "./Profile";

export class User{
  id!:bigint;
  adresse!:String;
  code!:String;
  email !:String;
  image!:String;
  password !:String;
  phone !:String;
  role !:String;
  firstname !:String;
  lastname !:String;
  prof: Profile | null = null;
  depar: Departement | null = null;
}
