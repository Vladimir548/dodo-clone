import { UserRole } from '@/interface/enums'
import { ICart } from '@/interface/interface-cart'
import { IOrder } from '@/interface/interface-order'
import { IVerificationCode } from '@/interface/interface-varification-code'

export interface IUser {
	id: number
	fullName: string
	email: string
	password: string
	phone: number
	role: UserRole
	verified?: Date
	provider?: string
	providerId?: string
	createdAt: Date
	updatedAt: Date
	cart?: ICart
	orders: IOrder[]
	verificationCode?: IVerificationCode
}
