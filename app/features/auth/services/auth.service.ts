import { axiosClassic } from '@/app/api/axios/axios'
import {
	TypeNewPasswordSchema,
	TypeRegisterSchema,
	TypeResetPasswordSchema,
} from '../schemes'
import { TypeLoginSchema } from '../schemes/login.schema'
import { IUser, TypeProvider } from '../types'

export const AuthService = {
	async register(body: TypeRegisterSchema, recaptcha?: string) {
		const { data } = await axiosClassic.post<IUser>('/auth/register', body, {
			headers: {
				recaptcha,
			},
		})
		return data
	},
	async login(body: TypeLoginSchema, recaptcha?: string) {
		const { data } = await axiosClassic.post<{ message: string; id: string }>(
			'/auth/login',
			body,
			{
				headers: {
					recaptcha,
				},
			}
		)
		return data
	},
	async twoFactor(code: string, id: string | null) {
		const { data } = await axiosClassic.post<IUser>('/auth/login/two-factor', {
			code,
			id,
		})
		return data
	},

	async oauthByProvider(provider: TypeProvider) {
		const { data } = await axiosClassic.get<{ url: string }>(
			`/auth/oauth/connect/${provider}`
		)
		return data
	},
	async verification(token: string) {
		const { data } = await axiosClassic.post(`/auth/email-confirmation`, {
			token,
		})
		return data
	},
	async logout() {
		const { data } = await axiosClassic.post('/auth/logout')
		return data
	},
	async resetPassword(body: TypeResetPasswordSchema, recaptcha?: string) {
		const { data } = await axiosClassic.post<IUser>(
			'/auth/password-recovery/reset',
			body,
			{
				headers: {
					recaptcha,
				},
			}
		)
		return data
	},
	async newPassword(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const { data } = await axiosClassic.post<IUser>(
			`/auth/password-recovery/new/${token}`,
			body,
			{
				headers: {
					recaptcha,
				},
			}
		)
		return data
	},
}
