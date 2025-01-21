import { TypeProduct } from '@/interface/enums'
import { IVariant } from '@/interface/interface-variant'
import { axiosClassic } from './axios/axios'

export const QueryVariant = {
	async create(dto: IVariant) {
		const { data } = await axiosClassic.post('/variant-types/create', dto)
		return data as IVariant
	},
	async byType(type: TypeProduct) {
		const { data } = await axiosClassic.get('/variant-types/by-type', {
			params: {
				type,
			},
		})
		return data as IVariant[]
	},
}
