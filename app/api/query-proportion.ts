
import {axiosClassic} from "@/app/api/axios/axios";

import {IProportion} from "@/interface/IProportion";



export const QueryProportion = {

    async create(dto:IProportion){
        const {data} = await  axiosClassic.post<IProportion>('/proportion/create',dto)
        return data as IProportion
    },
    async all (){
        const {data} = await axiosClassic.get<IProportion[]>('/size/all')
        return data as IProportion[]
    },
    async byType (type:number | undefined){
        const {data} = await axiosClassic.get<IProportion[]>('/proportion/by-type',{
            params:{
                type
            }
        })
        return data as IProportion[]
    },
}