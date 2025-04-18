'use client'
import { QueryCart } from '@/app/api/query-cart'
import { QueryOrder } from '@/app/api/query-order'
import useUserData from '@/app/features/profile/hooks/useUserData'
import Container from '@/components/shared/Container'
import OrderPrice from '@/components/shared/order/OrderPrice'
import OrderSectionAddressDelivery from '@/components/shared/order/OrderSectionAddressDelivery'
import OrderSectionCart from '@/components/shared/order/OrderSectionCart'
import OrderSectionPersonalData from '@/components/shared/order/OrderSectionPersonalData'
import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useCurrentUser from '@/hooks/useCurrentUser'
import { ICartItem } from '@/interface/interface-cart-item'
import { IOrder } from '@/interface/interface-order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Path, SetValueConfig, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Order() {
	const userId = useCurrentUser()?.userId
	const { data, isPending } = useQuery({
		queryKey: ['cart-id', userId],
		queryFn: () => QueryCart.getById(userId),
		enabled: !!userId,
	})
	const { data: profile } = useUserData()

	const { replace } = useRouter()
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['order-id', userId],
		mutationFn: (data: IOrder) => QueryOrder.create(data),
		onSuccess: () => {
			toast.success('Заказ оформлен')
			replace('/profile')
			queryClient.invalidateQueries({ queryKey: ['cart-id'] })
		},
		onError: () => {
			toast.error('Ошибка')
		},
	})

	const form = useForm<IOrder>({
		defaultValues: {
			comment: '',
			firstName: profile?.fullName,
			phone: profile?.phone,
			email: profile?.email,
		},
	})

	useEffect(() => {
		const jsonItemsData = data?.items?.map((item: ICartItem) => ({
			cartId: item.cartId,
			productVariant:
				item.productVariant?.productAttribute?.variantTypes?.value,
			productVariantName: item.productVariant?.productAttribute?.name,
			product: item.product.name,
			size: item.size?.proportion?.value,
			ingredients: item.ingredients
				.map(ingredient => ingredient.name)
				.join(', '),
			weight: item?.size?.weight,
			quantity: item.quantity,
			createdAt: new Date(item.createdAt),
			updatedAt: new Date(item.updatedAt),
		}))
		form.reset({
			items: jsonItemsData,
			totalAmount: Number(data?.totalAmount),
			userId: Number(userId),
		})
	}, [data, userId, form.reset])

	const onSubmit = (data: IOrder) => {
		mutate(data)
	}

	if (data?.items.length === 0 || !data || !profile)
		return (
			<div
				className={'flex justify-center items-center flex-col h-screen gap-y-4'}
			>
				<Title size={'lg'} text={'Вы не выбрали ни одного товара'} />
				<Button
					onClick={() => replace('/')}
					className={'flex items-center gap-x-2 px-5 py-4'}
				>
					{' '}
					<ArrowLeft size={20} /> Вернуться назад
				</Button>
			</div>
		)
	return (
		<Container className={'py-10'}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={'flex gap-x-3'}>
					<div className={'w-[800px] flex flex-col gap-y-3'}>
						<section>
							<OrderSectionCart isPending={isPending} items={data?.items} />
						</section>
						<section>
							<OrderSectionPersonalData
								data={profile}
								fieldEmail={'email'}
								fieldPhone={'phone'}
								fieldFirstName={'firstName'}
								control={form.control}
								setValue={(
									name: string,
									value: unknown,
									config?: SetValueConfig
									// @ts-ignore
								) => form.setValue(name, value, config)}
							/>
						</section>
						<section>
							<OrderSectionAddressDelivery
								arrayAddress={profile?.deliveryAddress}
								control={form.control}
								fieldComment={'comment'}
								fieldAddress={'address'}
								setValue={(
									name: string,
									value: unknown,
									config?: SetValueConfig
									// @ts-ignore
								) => form.setValue(name, value, config)}
							/>
						</section>
					</div>
					<div>
						<OrderPrice
							isPending={isPending}
							totalAmount={data?.totalAmount}
							amountGoods={data?.amountGoods}
							count={data?._count?.items}
						/>
					</div>
				</form>
			</Form>
		</Container>
	)
}
