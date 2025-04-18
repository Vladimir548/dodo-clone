'use client'

import { QueryVariant } from '@/app/api/query-variant'
import { InputCustom } from '@/components/shared/InputCustom'
import { IVariant } from '@/interface/interface-variant'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FormLayout from '../../FormLayout'
import MultipleSelectCategory from '../_ui/select/MultipleSelectCategory'
import SelectType from '../_ui/select/SelectType'

function CreateVariant() {
	const { handleSubmit, control, register } = useForm<IVariant>()
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['create-proportion'],
		mutationFn: (dto: IVariant) => QueryVariant.create(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['variant-by-type'],
			})
			toast.success('Данные добавлены')
		},
		onError: () => {
			toast.error('Ошибка при добавлении данных')
		},
	})
	const onSubmit: SubmitHandler<IVariant> = data => {
		mutate(data)
	}
	return (
		<FormLayout
			handleFn={handleSubmit(onSubmit)}
			buttonVariant={'create'}
			title={'Создание вариантов'}
		>
			<InputCustom
				label={'Название'}
				{...register('value', { required: true })}
			/>
			<MultipleSelectCategory control={control} field={'categories'} />
			<SelectType control={control} field={'typeProduct'} />
		</FormLayout>
	)
}

export default CreateVariant
