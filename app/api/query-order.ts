import {axiosClassic} from "@/app/api/axios/axios";
import {IOrder} from "@/interface/interface-order";


export const QueryOrder = {
    async create(dto:IOrder){
        const {data} = await  axiosClassic.post(`/order/create`,dto)
        return data as IOrder
    }
}