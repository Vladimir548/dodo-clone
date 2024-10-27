import {axiosClassic} from "@/app/api/axios/axios";
import {IUser} from "@/interface/interface-user";
import {IAuth} from "@/interface/interface-auth";


export const QueryAuth={
    async register (dto:IAuth){
        const {data} = await  axiosClassic.post<IUser>('/auth/register',dto)
        return data as IUser
    },
    async login (dto:IAuth){
        const {data} = await axiosClassic.post<IUser>('/auth/login',dto)
        return data as IUser
    }
}