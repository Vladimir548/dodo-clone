import { z } from 'zod'

export const DeliveryAddressCreateSchema = z.object({
	address: z.string({
		message: 'Некорректный адрес ',
	}),
	isDefault: z.boolean(),
})

export type TypeDeliveryAddressCreateSchema = z.infer<
	typeof DeliveryAddressCreateSchema
>
