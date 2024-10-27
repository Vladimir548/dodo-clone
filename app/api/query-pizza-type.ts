
import {axiosClassic,} from "@/app/api/axios/axios";
import {IPizzaType} from "@/interface/interface-pizza-type";



export const QueryPizzaType = {

    async create(dto:IPizzaType){
        const {data} = await  axiosClassic.post<IPizzaType>('/pizza-type/create',dto)
        return data as IPizzaType
    },
    async all (){
        const {data} = await axiosClassic.get<IPizzaType[]>('/pizza-type/all')
        return data as IPizzaType[]
    },

}