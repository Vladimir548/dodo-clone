import { axiosClassic } from '@/app/api/axios/axios'

import { IProportion, IProportionData } from '@/interface/IProportion'

export const QueryProportion = {
	async create(dto: IProportion) {
		const { data } = await axiosClassic.post<IProportion>(
			'/proportion/create',
			dto
		)
		return data as IProportion
	},
	async all() {
		const { data } = await axiosClassic.get<IProportion[]>('/proportion/all')
		return data as IProportion[]
	},
	async byCategory(categoryId: number | null | undefined) {
		const { data } = await axiosClassic.get<IProportion[]>(
			'/proportion/by-type',
			{
				params: {
					categoryId,
				},
			}
		)
		return data as IProportion[]
	},
	async update(dto: IProportionData) {
		const { data } = await axiosClassic.patch<IProportionData>(
			`/proportion/update/${dto.id}`,
			dto
		)
		return data as IProportionData
	},
}
