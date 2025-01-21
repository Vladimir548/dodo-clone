'use client'
import { QueryCart } from '@/app/api/query-cart'
import CartItemList from '@/components/cart/CartItemList'
import { Title } from '@/components/shared/Title'
import TooltipDelivery from '@/components/tooltips/TooltipDelivery'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import useCurrentUser from '@/hooks/useCurrentUser'
import useDefinitionGoods from '@/hooks/useDefinitionGoods'
import { useDeliveryPrice } from '@/hooks/useDeliveryPrice'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DialogCart() {
	const userId = useCurrentUser()?.userId
	const { data, isPending, isFetching } = useQuery({
		queryKey: ['cart-id', userId],
		queryFn: () => QueryCart.getById(userId),
		enabled: !!userId,
	})
	const priceDelivery = useDeliveryPrice(data?.amountGoods)
	const definitionGoods = useDefinitionGoods(data?._count.items)
	if (!data)
		return (
			<Button
				className={'flex items-center gap-x-1 rounded-lg w-[140px]'}
				variant={'default'}
			>
				<b className={'w-[40px] line-clamp-1 overflow-hidden'}> 0</b>
				<b>₽</b>
				<span className={'w-[1px] h-full bg-white/30'}></span>
				<div className={' relative'}>
					<span
						className={
							'flex items-center opacity-100 gap-x-2 duration-300 group-hover:opacity-0'
						}
					>
						<ShoppingCart size={16} /> 0
					</span>
					<ArrowRight
						size={20}
						className={
							'absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  duration-300 opacity-0 group-hover:opacity-100'
						}
					/>
				</div>
			</Button>
		)
	return (
		<Drawer direction={'right'}>
			<DrawerTrigger asChild>
				<Button
					className={'flex items-center gap-x-1 rounded-lg w-[140px]'}
					variant={'default'}
				>
					<b className={'w-[40px] line-clamp-1 overflow-hidden'}>
						{data?.totalAmount ?? 0}
					</b>
					<b>₽</b>
					<span className={'w-[1px] h-full bg-white/30'}></span>
					<div className={' relative'}>
						<span
							className={
								'flex items-center opacity-100 gap-x-2 duration-300 group-hover:opacity-0'
							}
						>
							<ShoppingCart size={16} /> {data?._count?.items}
						</span>
						<ArrowRight
							size={20}
							className={
								'absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  duration-300 opacity-0 group-hover:opacity-100'
							}
						/>
					</div>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				{data?.items?.length > 0 ? (
					<>
						<DrawerHeader>
							<DrawerTitle>
								В корзине {data?._count?.items} {definitionGoods}{' '}
							</DrawerTitle>
						</DrawerHeader>
						<div className='p-1 pb-0 overflow-y-auto scrollbar h-full mr-1'>
							<CartItemList isPending={isPending} items={data?.items} />
						</div>
						<DrawerFooter className={'px-5 '}>
							<div className={' flex flex-col gap-y-3'}>
								<div
									className={
										'flex flex-col gap-y-3 border-b pb-2 border-gray-500 '
									}
								>
									<p className={'  flex items-center justify-between '}>
										{' '}
										{data?._count?.items} {definitionGoods}
										<b>{data?.amountGoods} ₽</b>
									</p>
									<p className={'  flex items-center justify-between '}>
										<span className={'flex items-center gap-x-1'}>
											Доставка <TooltipDelivery />
										</span>{' '}
										<b>{priceDelivery}</b>
									</p>
								</div>
								<p className=' flex items-center justify-between  text-lg'>
									Сумма заказа
									<span className='flex-grow  dotted-line'></span>
									<b className='text-nowrap text-primary'>
										{data?.totalAmount} ₽
									</b>
								</p>
							</div>
							<DrawerClose asChild>
								<Link href={'/order'}>
									<Button className={'w-full py-6 font-bold text-base'}>
										Перейти к оформлению
									</Button>
								</Link>
							</DrawerClose>
						</DrawerFooter>
					</>
				) : (
					<div
						className={
							'flex flex-col justify-center items-center h-full gap-y-3'
						}
					>
						<VisuallyHidden>
							<DrawerTitle></DrawerTitle>
						</VisuallyHidden>
						<Image
							quality={100}
							src={'/box.png'}
							alt={'box'}
							width={120}
							height={120}
						/>
						<Title text={'Корзина пуста'} />
						<DrawerClose asChild>
							<Button className={'flex items-center gap-x-2'}>
								{' '}
								<ArrowLeft size={20} /> Вернуться назад
							</Button>
						</DrawerClose>
					</div>
				)}
			</DrawerContent>
		</Drawer>
	)
}
