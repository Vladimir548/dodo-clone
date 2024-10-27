import {ICategory} from "@/interface/interface-category";

import {axiosClassic} from "@/app/api/axios/axios";


export const QueryCategory = {
    async create(dto:ICategory){
        const {data} = await axiosClassic.post<ICategory>('/category/create',dto);
        return data as ICategory;
    },  async all(){
        const {data} = await axiosClassic.get<ICategory[]>('/category/all',);
        return data as ICategory[];
    },
}