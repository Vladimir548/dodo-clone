'use client'

import { QueryVariant } from '@/app/api/query-variant'
import SelectCustom from '@/components/SelectCustom'
import { TypeProduct } from '@/interface/enums'
import { IHookForm } from '@/interface/interface-hook-form'
import { useQuery } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'

function SelectPizzaVariant<T extends FieldValues>({
	control,
	field,
}: IHookForm<T>) {
	const { data } = useQuery({
		queryKey: ['variant-by-type'],
		queryFn: () => QueryVariant.byType(TypeProduct.PIZZA),
	})
	const items = data?.map(variant => ({
		value: variant.id,
		name: variant.value,
	}))
	if (!field) return

	return (
		<SelectCustom
			control={control}
			field={field}
			label={'Тип теста'}
			renderItems={items}
		/>
	)
}

export default SelectPizzaVariant
