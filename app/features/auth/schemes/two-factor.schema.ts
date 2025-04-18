import { z } from 'zod'

export const TwoFactorSchema = z.object({
	code: z.string().min(6, {
		message: 'Некорректный код ',
	}),
})

export type TypeTwoFactorSchema = z.infer<typeof TwoFactorSchema>
