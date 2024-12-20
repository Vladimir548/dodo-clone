import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useDataParams } from '@/hooks/useDataParams'
import { useGetCategories } from '@/hooks/useGetCategories'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { useFiltersStore } from '@/store/filters'
import { useEffect } from 'react'

interface Props {
	className?: string
}

interface IItems {
	slug: string
	name: string
}

export default function Categories({ className }: Props) {
	const { data, isPending } = useGetCategories()
	const { activeCategory, setActiveCategory, setClickCategory } =
		useCategoryStore()
	const setCurrentSlug = useFiltersStore(state => state.setCurrentCategory)

	useEffect(() => {
		if (data) {
			setActiveCategory(data[0]?.slug)
		}
	}, [data])

	useDataParams('slug', setCurrentSlug, 'str')

	if (!data) return null
	if (isPending)
		return (
			<div className={'w-full'}>
				<Skeleton count={1} className={'w-10/12 h-[55px] dark:bg-primary'} />
			</div>
		)
	const items: IItems[] = data
		?.filter(item => item.products.length > 0)
		.map(category => ({
			name: category.name,
			slug: category.slug,
		}))

	return (
		<div
			className={cn(
				'inline-flex gap-1 bg-gray-100 dark:bg-transparent dark:border-2 dark:border-primary p-1 rounded-2xl',
				className
			)}
		>
			{items?.map(({ name, slug }, index) => (
				<Button
					variant={'outline'}
					onClick={() => {
						setActiveCategory(slug)
						setClickCategory(slug)
					}}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl duration-300 px-5 border-2 border-transparent hover:border-primary',
						activeCategory === slug &&
							'dark:bg-primary bg-primary text-white  dark:shadow-none '
					)}
					key={index}
				>
					<span>{name}</span>
				</Button>
			))}
		</div>
	)
}
