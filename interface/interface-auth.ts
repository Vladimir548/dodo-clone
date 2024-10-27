




export interface IAuth {
    fullName: string;
    email:string
    password:string
    controlPassword?:string,
    role:"USER" | 'ADMIN'

}