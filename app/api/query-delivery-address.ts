import { axiosClassic } from '@/app/api/axios/axios'
import { IDeliveryAddress } from '@/interface/interface-delivery-address'
import { TypeDeliveryAddressCreateSchema } from '../features/profile/schemas/delivery-addres-create.schema'

export const QueryDeliveryAddress = {
	async create(dto: TypeDeliveryAddressCreateSchema) {
		const { data } = await axiosClassic.post<IDeliveryAddress>(
			'/delivery-address/create',
			dto
		)
		return data as IDeliveryAddress
	},
	async all() {
		const { data } = await axiosClassic.get<IDeliveryAddress[]>(
			'/delivery-address/user'
		)
		return data as IDeliveryAddress[]
	},
	async update(id: number, dto?: TypeDeliveryAddressCreateSchema) {
		const { data } = await axiosClassic.patch<
			TypeDeliveryAddressCreateSchema[]
		>(`/delivery-address/update/${id}`, dto)
		return data as IDeliveryAddress[]
	},
	async changeDefaultAddress(id: number) {
		const { data } = await axiosClassic.patch<
			TypeDeliveryAddressCreateSchema[]
		>(`/delivery-address/change-default/${id}`)
		return data as IDeliveryAddress[]
	},
	async delete(id: number) {
		const { data } = await axiosClassic.delete<
			TypeDeliveryAddressCreateSchema[]
		>(`/delivery-address/delete/${id}`)
		return data as IDeliveryAddress[]
	},
}
