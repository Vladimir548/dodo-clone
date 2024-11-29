import { axiosData } from '@/app/api/axios/axios'
import { IIngredient } from '@/interface/interface-ingredient'

export const QueryIngredient = {
	async create(dto: IIngredient) {
		const formData = new FormData()
		formData.append('file', dto.file)
		formData.append('name', dto.name)
		formData.append('price', dto.price.toString())
		formData.append('categories', JSON.stringify(dto.categories))

		const { data } = await axiosData.post<IIngredient>(
			'/ingredient/create',
			formData
		)
		return data as IIngredient
	},
	async all() {
		const { data } = await axiosData.get<IIngredient[]>('/ingredient/all')
		return data as IIngredient[]
	},
	async byCategory(type: number | null | undefined) {
		const { data } = await axiosData.get<IIngredient[]>('/ingredient/by-type', {
			params: {
				type,
			},
		})
		return data as IIngredient[]
	},
}
