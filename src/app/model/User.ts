import { Departement } from "./Departement";
import { Profile } from "./Profile";

export class User{
  id_user!:bigint;
  adresse!:String;
  code!:String;
  email !:String;
  image!:String;
  password !:String;
  phone !:String;
  role !:String;
  user_name !:String;
  login!:String;
  prof !:Profile;
  depar!:Departement;
}
