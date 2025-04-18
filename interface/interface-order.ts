import { OrderStatus } from '@/interface/enums'
import { IUser } from '@/interface/interface-user'

export type CartItemJson = {
	cartId: number
	productVariant: string | null
	productVariantName: string
	product: string
	size: string
	quantity: number
	ingredients?: string
	weight?: number
	createdAt: Date
	updatedAt: Date
}

export interface IOrder {
	id: number
	userId: number
	totalAmount: number
	status?: OrderStatus
	paymentId?: string
	items: CartItemJson[] | undefined
	firstName: string
	lastName: string
	email: string
	phone: number
	address: string
	comment?: string
	createdAt: Date
	updatedAt: Date
	user: IUser
}
