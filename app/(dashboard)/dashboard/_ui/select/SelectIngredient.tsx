'use client'

import { QueryIngredient } from '@/app/api/query-ingredient'
import MultipleSelect from '@/components/select-custom/MultipleSelect'
import { IHookForm } from '@/interface/interface-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Option } from 'rc-select'
import { FieldValues } from 'react-hook-form'
interface IIngredient<T extends FieldValues> extends IHookForm<T> {
	type: number | undefined
}
export default function SelectIngredient<T extends FieldValues>({
	field,
	control,
	type,
}: IIngredient<T>) {
	const { data } = useQuery({
		queryKey: ['by-type-ingredient', type],
		queryFn: () => QueryIngredient.byCategory(type),
		enabled: !!type,
	})
	return (
		<div>
			{field && (
				<MultipleSelect
					field={field}
					control={control}
					label={'Выберите ингредиенты'}
					option={data?.map(val => (
						<Option key={val.id} value={val.id}>
							{val.name}
						</Option>
					))}
				/>
			)}
		</div>
	)
}
