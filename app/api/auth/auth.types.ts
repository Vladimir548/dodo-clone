import {IUser} from "@/interface/interface-user";


export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface IFormData {
  login: string;
  password: string;
  fio: string;
  role: Role;
}
enum Role {
  admin='admin',
  logist='logist',
}
