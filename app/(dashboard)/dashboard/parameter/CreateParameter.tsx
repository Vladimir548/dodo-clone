'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import MultipleSelectCategory from '@/app/(dashboard)/dashboard/_ui/select/MultipleSelectCategory'
import FormLayout from '@/app/(dashboard)/FormLayout'
import { QueryParameter } from '@/app/api/query-parameter'
import { InputCustom } from '@/components/shared/InputCustom'
import { IParameter } from '@/interface/interface-parameter'
import { toast } from 'sonner'

export default function CreateParameter() {
	const { handleSubmit, control, register } = useForm<IParameter>()
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['create-parameter'],
		mutationFn: (dto: IParameter) => QueryParameter.create(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['by-type-parameter'],
			})
			toast.success('Данные добавлены')
		},
		onError: () => {
			toast.error('Ошибка при добавлении данных')
		},
	})
	const onSubmit: SubmitHandler<IParameter> = data => {
		mutate(data)
	}
	return (
		<FormLayout
			handleFn={handleSubmit(onSubmit)}
			buttonVariant={'create'}
			title={'Создание параметров'}
		>
			<InputCustom
				label={'Объем или масса'}
				{...register('parameter', { required: true })}
			/>
			<MultipleSelectCategory control={control} field={'categories'} />
		</FormLayout>
	)
}
