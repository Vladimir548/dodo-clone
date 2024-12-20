import { axiosClassic, axiosData } from '@/app/api/axios/axios'
import { IFilterParams } from '@/interface/interface-filter-params'
import { IProduct } from '@/interface/interface-product'

export const QueryProduct = {
	async create(dto: IProduct) {
		const formData = new FormData()
		formData.append('file', dto.file)
		formData.append('name', dto.name)
		formData.append('categoryId', dto.categoryId.toString())
		if (dto.ingredientIds) {
			formData.append('ingredientIds', JSON.stringify(dto.ingredientIds))
		}

		const { data } = await axiosData.post<IProduct>('/product/create', dto)
		return data as IProduct
	},
	async all() {
		const { data } = await axiosClassic.get<IProduct[]>('/product/all')
		return data as IProduct[]
	},
	async byCategory(id: number | string, params?: IFilterParams) {
		const { data } = await axiosClassic.get<IProduct[]>(
			`/product/category/${id}`,
			{
				params: {
					params,
				},
			}
		)
		return data as IProduct[]
	},
	async getSubProduct() {
		const { data } = await axiosClassic.get<IProduct[]>(`/product/sub-product`)
		return data as IProduct[]
	},
	async id(id: number | string) {
		const { data } = await axiosClassic.get<IProduct>(`/product/${id}`)
		return data as IProduct
	},
	async getProductIds(ids: number[]) {
		const { data } = await axiosClassic.get<IProduct>(`/product/by-ids`, {
			params: {
				ids: ids,
			},
		})
		return data as IProduct
	},
	async query(query: string) {
		const { data } = await axiosClassic.get<Record<string, IProduct[]>>(
			`/product/search`,
			{
				params: {
					query,
				},
			}
		)
		return data as Record<string, IProduct[]>
	},
	async maxPrice(categoryId: number | null) {
		const { data } = await axiosClassic.get<number>(`/product/max-price`, {
			params: {
				categoryId,
			},
		})
		return data as number
	},
}
