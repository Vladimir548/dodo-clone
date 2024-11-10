import {IProduct} from "@/interface/interface-product";
import {axiosClassic, axiosData} from "@/app/api/axios/axios";


export const QueryProduct = {

    async create(dto: IProduct) {
        const formData = new FormData();
        formData.append('file', dto.file)
        formData.append('name', dto.name)
        formData.append('categoryId', dto.categoryId.toString());

        const {data} = await axiosData.post<IProduct>('/product/create', dto)
        return data as IProduct
    },
    async all() {
        const {data} = await axiosClassic.get<IProduct[]>('/product/all')
        return data as IProduct[]
    },
    async byCategory(id: number | string) {
        const {data} = await axiosClassic.get<IProduct[]>(`/product/category/${id}`)
        return data as IProduct[]
    },
    async id(id: number | string) {
        const {data} = await axiosClassic.get<IProduct>(`/product/${id}`)
        return data as IProduct
    },
    async query(query: string) {
        const {data} = await axiosClassic.get<Record<string, IProduct[]>>(`/product/search`, {
            params: {
                query
            }
        })
        return data as Record<string, IProduct[]>
    },
    async maxPrice() {
        const {data} = await axiosClassic.get<number>(`/product/max-price`)
        return data as number
    }
}