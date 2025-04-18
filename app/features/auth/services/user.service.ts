import { axiosClassic } from '@/app/api/axios/axios'
import { TypeProfileSchema } from '../schemes/profile.schema'
import { IUser } from '../types'

export const UserService = {
	async profile() {
		try {
			const { data } = await axiosClassic.get('/user/profile')
			return data as IUser
		} catch {
			return null
		}
	},
	async update(body: TypeProfileSchema) {
		const { data } = await axiosClassic.patch('/user/update', body)
		return data as IUser
	},
}
