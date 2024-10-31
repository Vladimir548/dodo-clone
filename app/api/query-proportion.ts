
import {axiosClassic} from "@/app/api/axios/axios";
import {ISize} from "@/interface/interface-size";
import {TypeProduct} from "@/interface/enums";



export const QueryProportion = {

    async create(dto:ISize){
        const {data} = await  axiosClassic.post<ISize>('/proportion/create',dto)
        return data as ISize
    },
    async all (){
        const {data} = await axiosClassic.get<ISize[]>('/size/all')
        return data as ISize[]
    },
    async byType (type:TypeProduct | undefined){
        const {data} = await axiosClassic.get<ISize[]>('/size/by-type',{
            params:{
                type
            }
        })
        return data as ISize[]
    },
}