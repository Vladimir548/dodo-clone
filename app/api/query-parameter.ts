import { axiosClassic, axiosData } from '@/app/api/axios/axios'
import { TypeProduct } from '@/interface/enums'
import { IParameter } from '@/interface/interface-parameter'

export const QueryParameter = {
	async create(dto: IParameter) {
		const { data } = await axiosClassic.post<IParameter>(
			'/parameter/create',
			dto
		)
		return data as IParameter
	},
	async all() {
		const { data } = await axiosData.get<IParameter[]>('/parameter/all')
		return data as IParameter[]
	},
	async byType(type: TypeProduct | undefined) {
		const { data } = await axiosData.get<IParameter[]>('/parameter/by-type', {
			params: {
				type,
			},
		})
		return data as IParameter[]
	},
}
