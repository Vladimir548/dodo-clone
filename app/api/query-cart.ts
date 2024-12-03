import { axiosClassic } from '@/app/api/axios/axios'
import { ICart } from '@/interface/interface-cart'

export const QueryCart = {
	async getById(userId: number | null | undefined) {
		const { data } = await axiosClassic.get(`/cart/by/${userId}`)

		return data as ICart
	},
}
