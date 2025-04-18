import { z } from 'zod'

export const ProfileSchema = z.object({
	fullName: z.string().min(2),
	email: z.string().email({
		message: 'Некорректная почта ',
	}),
	phone: z.number(),
})

export type TypeProfileSchema = z.infer<typeof ProfileSchema>
