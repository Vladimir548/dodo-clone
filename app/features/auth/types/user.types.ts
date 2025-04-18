import { ICart } from '@/interface/interface-cart'
import { IDeliveryAddress } from '@/interface/interface-delivery-address'

export enum UserRole {
	Regular = 'REGULAR',
	Admin = 'ADMIN',
}

export enum AuthMethod {
	Credentials = 'CREDENTIALS',
	Google = 'GOOGLE',
	Yandex = 'YANDEX',
}

export interface IAccount {
	id: string
	createdAt: Date
	updatedAt: Date
	type: string
	provider: string
	refreshToken: string
	accessToken: string
	expiresAt: number
	userId: string
}

export interface IUser {
	id: string
	createdAt: Date
	updatedAt: Date
	email: string
	phone?: number
	password: string
	fullName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	accounts: IAccount[]
	cart: ICart
	deliveryAddress: IDeliveryAddress[]
}
