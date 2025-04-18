import { IOrder } from './interface-order'

export interface IDeliveryAddress {
	id: number
	userId: number
	address: string
	isDefault: boolean
	Order: IOrder
}
