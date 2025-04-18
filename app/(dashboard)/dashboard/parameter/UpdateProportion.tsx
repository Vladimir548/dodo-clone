'use client'

import MultipleSelectCategory from '@/app/(dashboard)/dashboard/_ui/select/MultipleSelectCategory'
import FormLayout from '@/app/(dashboard)/FormLayout'
import { QueryProportion } from '@/app/api/query-proportion'
import SelectCustom from '@/components/SelectCustom'
import { InputCustom } from '@/components/shared/InputCustom'
import { IProportionData } from '@/interface/IProportion'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function UpdateProportion() {
	const { data } = useQuery({
		queryKey: ['all-size'],
		queryFn: () => QueryProportion.all(),
	})
	const { handleSubmit, control, register, watch, reset } =
		useForm<IProportionData>()

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['update-proportion'],
		mutationFn: (dto: IProportionData) => QueryProportion.update(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['by-type-size'],
			})
			toast.success('Данные обновлены')
		},
		onError: () => {
			toast.error('Ошибка при обновление данных')
		},
	})
	const watchId = watch('id')

	const onSubmit: SubmitHandler<IProportionData> = data => {
		mutate(data)
	}

	useEffect(() => {
		if (watchId) {
			const dataId = data?.find(item => Number(item.id) === Number(watchId))
			reset({
				id: Number(dataId?.id),
				value: dataId?.value,
				categories: dataId?.categories.map(item => Number(item.id)),
			})
		}
	}, [watchId])

	return (
		<div>
			<FormLayout
				handleFn={handleSubmit(onSubmit)}
				buttonVariant={'editing'}
				title={'Обновление размеров'}
			>
				<SelectCustom
					control={control}
					field='id'
					renderItems={data?.map(val => ({
						name: val.value,
						value: val.id,
					}))}
					label={'Номер размера'}
				/>
				<InputCustom label={'Размер'} {...register('value')} />
				<MultipleSelectCategory control={control} field={'categories'} />
			</FormLayout>
		</div>
	)
}
